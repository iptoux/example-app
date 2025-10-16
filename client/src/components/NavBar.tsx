import { Link } from "@tanstack/react-router"
import { signOut, useSession } from "../lib/auth-client";

export function NavBar() {
    const { data: session } = useSession();

    return (
        <div className="p-2 flex">
            <Link to="/" className="[&.active]:font-bold">
            Home
            </Link>{" "}
            {session ? (
            <button onClick={() => signOut()}>Sign Out</button>
            ) : (
            <>
                <Link to="/login" className="[&.active]:font-bold">
                Login
                </Link>{" "}
                <Link to="/register" className="[&.active]:font-bold">
                Register
                </Link>
            </>
            )}
        </div>
    );
}