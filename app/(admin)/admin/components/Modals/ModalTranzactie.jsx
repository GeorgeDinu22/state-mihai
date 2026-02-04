
import './modalTranzactie.css';

export default function ModalAchizitie({tranzactie}){


    return<>
        <div  style={{ width: "100%" }} className="container">
            <h4>{`Tranzactie #${tranzactie.id}`}</h4>



            <div className="statusPlata">
                {tranzactie.status_plata === "success" ? 
                    (
                    <span className="statusBadge statusSuccess">✅ Plata Success</span>
                    ) :
                    (
                        <span className="statusBadge statusFailed">❌ Plata Eșuată</span>
                    )
                }
            </div>

       <section className="sectionDetaliiPlata">
        <h5>Detalii Plata</h5>

        <div>
            <span className="label">ID Plata Stripe: </span>
            <span className="value">{tranzactie.payment_intent_id}</span>
        </div>

        <div>
            <span className="label">Valoare Tranzactie (RON): </span>
            <span className="value">{tranzactie.pret / 100}</span>
        </div>

        <div>
            <span className="label">ID Produs: </span>
            <span className="value">{tranzactie.produs_id}</span>
        </div>

        <div>
            <span className="label">Data Tranzactie: </span>
            <span className="value">  {new Date(tranzactie.created_at).toLocaleString("ro-RO", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })}
            </span>
        </div>

        </section>

        <section className="sectionInfoClient">
        <h5>Informatii Client</h5>

        <div>
            <span className="label">Nume Client: </span>
            <span className="value">{tranzactie.clients?.numeComplet}</span>
        </div>

        <div>
            <span className="label">Email Client: </span>
            <span className="value">{tranzactie.clients?.email}</span>
        </div>

        <div>
            <span className="label">Telefon Client: </span>
            <span className="value">{tranzactie.clients?.telefon}</span>
        </div>

        </section>


    {(tranzactie.motiv_eroare || tranzactie.descriere_eroare) && (
    <section className="sectionDetaliiSuplimentare">
        <h5>Detalii Plată Eșuată</h5>

        <div>
        <span className="label">Motiv Eroare: </span>
        <span className="value">{tranzactie.motiv_eroare}</span>
        </div>

        <div>
        <span className="label">Descriere Eroare: </span>
        <span className="value">{tranzactie.descriere_eroare}</span>
        </div>
    </section>
            )}
        </div>
    </>
}