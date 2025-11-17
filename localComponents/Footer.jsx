import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faTiktok } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer id="contact">
      <div className="containerFooter">
        <h4 className="titluFooter">Mihai State</h4>

        <div className="containerSocial">
          <Link
            id="tiktok"
            href="https://www.tiktok.com/@state.mihai33?_t=ZN-8yFNoqJ0FHC&_r=1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon className="icon" icon={faTiktok} />
          </Link>

          <Link
            id="instagram"
            href="https://www.instagram.com/state.mihai/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon className="icon" icon={faInstagram} />
          </Link>
        </div>
      </div>

      <div className="containerLegalFooter">
        <h5>Informații legale</h5>
        <Link className="linkLegal" href="/politica-de-confidentialitate">
          Politica de Confidențialitate
        </Link>
         <Link className="linkLegal" href="/termeni-si-conditii/">
         Termeni și condiții
        </Link>
      </div>

       <div className="footerInfo">
         <h5>Date contact</h5>
          <p>Mihai State PFA</p>
          <p>
            CUI: 12345678<br />
            Sediu: București, România
          </p>
          <p>
            E-mail:{" "}
            <a href="mailto:contact@mihaistate.ro">contact@mihaistate.ro</a>
            <br />
            Tel: 07xx xxx xxx
          </p>
        </div>

      <div className="autor">
        © Mihai State | Toate Drepturile Rezervate – Created by Dinu George
      </div>
    </footer>
  );
}
