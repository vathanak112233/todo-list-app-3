import Image from "next/image";
import ButtonSign from "./button-sign";
export default function NavBar() {
    return (
        <nav>
            <div className="logo">
                <Image src="/logo.png" alt="logo" width={64} height={64} />
            </div>
            <div className="menu">
                <a href="./">Home</a>
                <a href="./task">Task</a>
            </div>
            <div className="action">
                <ButtonSign />
            </div>
        </nav>
    )
}