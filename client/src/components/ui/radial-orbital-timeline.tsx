"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap, Info } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
  compact?: boolean;
}

export default function RadialOrbitalTimeline({
  timelineData,
  compact,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {}
  );
  const viewMode = "orbital" as const;
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const centerOffset = { x: 0, y: 0 };
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [containerHeight, setContainerHeight] = useState<number>(0);
  const [isBelowLg, setIsBelowLg] = useState<boolean>(false);
  const [isBelowMd, setIsBelowMd] = useState<boolean>(false);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer: NodeJS.Timeout;

    if (autoRotate && viewMode === "orbital") {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.3) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate, viewMode]);

  const centerViewOnNode = (nodeId: number) => {
    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number, radiusOverride?: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = radiusOverride ?? (compact ? 200 : 260);
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "text-white bg-black border-white";
      case "in-progress":
        return "text-black bg-white border-black";
      case "pending":
        return "text-white bg-black/40 border-white/50";
      default:
        return "text-white bg-black/40 border-white/50";
    }
  };

  const containerHeightClass = compact ? "h-80 md:h-[36rem]" : "h-screen";
  // Responsive behavior: observe container width and listen for lg breakpoint
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateSize = () => {
      setContainerWidth(el.clientWidth || 0);
      setContainerHeight(el.clientHeight || 0);
    };
    updateSize();

    const ro = new ResizeObserver(() => {
      updateSize();
    });
    ro.observe(el);

    const mqLg = window.matchMedia("(max-width: 1024px)");
    const mqMd = window.matchMedia("(max-width: 768px)");
    const mqLgHandler = (ev: MediaQueryListEvent | MediaQueryList) => {
      setIsBelowLg(ev.matches);
    };
    const mqMdHandler = (ev: MediaQueryListEvent | MediaQueryList) => {
      setIsBelowMd(ev.matches);
    };
    setIsBelowLg(mqLg.matches);
    setIsBelowMd(mqMd.matches);
    if (mqLg.addEventListener) mqLg.addEventListener("change", mqLgHandler);
    else mqLg.addListener(mqLgHandler);
    if (mqMd.addEventListener) mqMd.addEventListener("change", mqMdHandler);
    else mqMd.addListener(mqMdHandler);

    return () => {
      ro.disconnect();
      if (mqLg.removeEventListener) mqLg.removeEventListener("change", mqLgHandler);
      else mqLg.removeListener(mqLgHandler);
      if (mqMd.removeEventListener) mqMd.removeEventListener("change", mqMdHandler);
      else mqMd.removeListener(mqMdHandler);
    };
  }, []);

  // compute radius dynamically based on container width (clamped)
  const computeRadius = () => {
    const base = compact ? 200 : 260;
    const minPossible = compact ? 140 : 160;
    if (!containerWidth || !containerHeight) return base;

    // available radius based on smallest dimension so circle fits
    const maxRadiusFromMinDim = Math.min(containerWidth, containerHeight) / 2 - 60; // padding
    const maxRadiusFromWidth = containerWidth / 3 - 40;
    const maxPossible = Math.min(base, maxRadiusFromMinDim, maxRadiusFromWidth);

    return Math.max(minPossible, Math.min(maxPossible, base));
  };

  // number of visible nodes: if below lg show one fewer
  const visibleCount = (() => {
    const total = timelineData.length;
    if (compact) return Math.min(7, total);
    // at <lg remove 2, at <md remove 3 (if enough items)
    if (isBelowMd && total > 3) return Math.max(1, total - 3);
    if (isBelowLg && total > 2) return Math.max(1, total - 2);
    return total;
  })();

  return (
    <div
      className={`w-full ${containerHeightClass} flex flex-col items-center justify-start bg-transparent overflow-hidden`}
      ref={containerRef}
      onClick={handleContainerClick}
    >
    <div className="relative w-full h-full flex items-center justify-center">
        {/* Info icon overlay positioned bottom-right inside the orbit container */}
        <div className="absolute right-4 bottom-4 z-[999]">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                aria-label="More Information: Items in the RadialOrbit are clickable"
                className="inline-flex items-center justify-center rounded-full p-2 bg-muted/70 hover:bg-muted transition-colors text-foreground/80 shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Info size={16} />
              </button>
            </TooltipTrigger>
            <TooltipContent sideOffset={6}>
              Items in the RadialOrbit are clickable
              <div className="text-xs text-secondary dark:text-background/60 mt-1">Visible nodes: {visibleCount}/{timelineData.length}</div>
            </TooltipContent>
          </Tooltip>
        </div>
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
            transition: "transform 450ms cubic-bezier(.2,.9,.2,1)",
          }}
        >
          <div className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-primary/80 via-secondary/60 to-accent/40 animate-pulse flex items-center justify-center z-10">
            <div className="absolute w-24 h-24 rounded-full border border-border/40 animate-ping opacity-80"></div>
            <div
              className="absolute w-28 h-28 rounded-full border border-border/30 animate-ping opacity-60"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div className="w-10 h-10 rounded-full bg-white/90 dark:bg-black/90 backdrop-blur-md"></div>
          </div>

          {(() => {
            const radius = computeRadius();
            const size = Math.max(120, Math.round(radius * 2));
            return (
              <div
                className="absolute rounded-full border border-border/30"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  marginLeft: `-${size / 2}px`,
                  marginTop: `-${size / 2}px`,
                  left: "50%",
                  top: "50%",
                }}
              />
            );
          })()}

          {(compact ? timelineData.slice(0, 7) : timelineData.slice(0, visibleCount)).map((item, index) => {
            const total = compact ? Math.min(7, timelineData.length) : visibleCount;
            const radius = computeRadius();
            const position = calculateNodePosition(index, total, radius);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            const openAbove = position.y > 0; // if node is below center, open card above

            return (
              <div
                  key={item.id}
                  ref={(el) => {
                    nodeRefs.current[item.id] = el;
                  }}
                  className="absolute cursor-pointer"
                  style={{
                    ...nodeStyle,
                    transition: "transform 450ms cubic-bezier(.2,.9,.2,1), opacity 300ms ease, z-index 150ms",
                  }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                <div
                  className={`absolute rounded-full -inset-1 ${
                    isPulsing ? "animate-pulse duration-1000" : ""
                  }`}
                  style={{
                    background: `radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)`,
                    width: `${item.energy * 0.5 + 40}px`,
                    height: `${item.energy * 0.5 + 40}px`,
                    left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                    top: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                  }}
                ></div>

                <div
                  className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  ${
                    isExpanded
                      ? "bg-foreground text-foreground-inverse"
                      : isRelated
                      ? "bg-foreground/60 text-foreground-inverse"
                      : "bg-card text-foreground"
                  }
                  border-2 
                  ${
                    isExpanded
                      ? "border-primary shadow-lg shadow-primary/30"
                      : isRelated
                      ? "border-primary animate-pulse"
                      : "border-border/40"
                  }
                  transition-all duration-300 transform
                  ${isExpanded ? "scale-150" : ""}
                `}
                >
                  <Icon size={16} />
                </div>

                <div
                  className={`
                  absolute top-12  whitespace-nowrap
                  text-xs font-semibold tracking-wider
                  transition-all duration-300
                  ${isExpanded ? "text-foreground scale-125" : "text-foreground/70"}
                `}
                >
                  {item.title}
                </div>

                {isExpanded && (
                  <Card className={`absolute ${openAbove ? "bottom-20" : "top-20"} left-1/2 -translate-x-1/2 w-64 sm:w-72 md:w-80 lg:w-96 bg-card/90 backdrop-blur-lg border-border/30 shadow-xl shadow-primary/10 overflow-visible max-w-[305px]`}>
                    <div className={`${openAbove ? "absolute bottom-3" : "absolute -top-3"} left-1/2 -translate-x-1/2 w-px h-3 bg-border/50`}></div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <Badge
                          className={`px-2 text-xs ${getStatusStyles(
                            item.status
                          )}`}
                        >
                          {item.status === "completed"
                            ? "COMPLETE"
                            : item.status === "in-progress"
                            ? "IN PROGRESS"
                            : "PENDING"}
                        </Badge>
                        <span className="text-xs font-mono text-foreground/60">
                          {item.date}
                        </span>
                      </div>
                      <CardTitle className="text-sm mt-2">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-foreground/80">
                      <p>{item.content}</p>

                      <div className="mt-4 pt-3 border-t border-border/10">
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="flex items-center">
                            <Zap size={10} className="mr-1" />
                            Energy Level
                          </span>
                          <span className="font-mono">{item.energy}%</span>
                        </div>
                        <div className="w-full h-1 bg-border/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-secondary"
                            style={{ width: `${item.energy}%` }}
                          ></div>
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-white/10">
                          <div className="flex items-center mb-2">
                            <Link size={10} className="text-foreground/70 mr-1" />
                            <h4 className="text-xs uppercase tracking-wider font-medium text-foreground/70">
                              Connected Nodes
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find(
                                (i) => i.id === relatedId
                              );
                              return (
                                <Button
                                  key={relatedId}
                                  variant="outline"
                                  size="sm"
                                  className="flex items-center h-6 px-2 py-0 text-xs rounded-none border-primary/20 bg-transparent hover:bg-primary/10 dark:text-destructive/80 hover:text-primary transition-all"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight
                                    size={8}
                                    className="ml-1 dark:text-destructive/60"
                                  />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}