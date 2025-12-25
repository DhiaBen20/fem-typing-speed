import trophy from "../assets/images/icon-personal-best.svg";
import logoLarge from "../assets/images/logo-large.svg";
import logoSmall from "../assets/images/logo-small.svg";
import Container from "./Container";
import InfoItem from "./InfoItem";

export default function Header() {
    return (
        <header className="pt-8">
            <Container className={"flex items-center justify-between"}>
                <a href="#">
                    <img src={logoSmall} alt="" className="block sm:hidden" />
                    <img src={logoLarge} alt="" className="hidden sm:block" />
                </a>
                <div className="flex items-center gap-2.5">
                    <img src={trophy} alt="" />
                    <InfoItem name="Personal best" value="92 WPM" />
                </div>
            </Container>
        </header>
    );
}
