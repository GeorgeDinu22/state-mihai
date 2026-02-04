"use client";

import { useState, startTransition } from 'react';
import styles from './modalAchizitie.module.css';
import { UserRoundCheck, UserRoundX } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';
import LoadingOverlay from '../LoadingOverlay';
import { setClientContacted } from '../../ServerActions/functions';
import { useRouter } from 'next/navigation';


export default function ModalTranzactie({ data, onSuccess }) {
    if (!data) return null;

    const router = useRouter();
    const [contactatInfo, setContactatInfo] = useState({
        contactat: data.client_contactat || false,
        data: data.data_contact_client || "",
        observatii: data.observatii_client_contactat || ""
    });

    const [loading, setLoading] = useState(false);

    function handleSetClientContacted(e){
        setLoading(true);
        e.preventDefault();
        const formData = new FormData(e.target);

        startTransition(async () => {
            try{
                const result = await setClientContacted(formData);
                if(result.ok){
                    toast.success("Acest client a fost marcat drept contactat cu success!");
                    onSuccess();
                    setContactatInfo(prev => ({
                        contactat:true,
                        data:new Date().toISOString(),
                        observatii: formData.get("observatiiAchizitie")
                    }));
                }
                else {
                    toast.error("Eroare: " + result.message);
                }
            }
            catch(err){
                toast.error("Eroare de server!")
            } finally{
                setLoading(false);
            }
        })
    }

    return (
        <>
            <div style={{ width: "100%" }} className={styles.container}>
                        
            <LoadingOverlay/>
            <Toaster/>

                <h4 className={styles.titluPrincipal}>Detalii Comandă</h4>

                <div className={styles.badgeclient}>
                    {contactatInfo.contactat ? (
                        <div className={styles.badgeSuccess}>
                            <UserRoundCheck size={24} /> Client Contactat
                        </div>
                    ) : (
                        <div className={styles.badgeError}>
                            <UserRoundX size={24} /> Client Necontactat
                        </div>
                    )}
                </div>

                <section className={styles.sectionDetaliiPlata}>
                    <h5 className={styles.subtitluSection}>Detalii Plată</h5>

                    <div className={styles.row}>
                        <span className={styles.label}>ID Comandă: </span>
                        <span className={styles.value}>{data.id}</span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.label}>ID Plată Stripe: </span>
                        <span className={styles.value}>{data.last_payment_intent_id}</span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.label}>Valoare Tranzacție (RON): </span>
                        <span className={styles.value}>{data.produse?.pret}</span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.label}>Data Tranzacție: </span>
                        <span className={styles.value}>
                            {new Date(data.updated_at).toLocaleString('ro-RO', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </span>
                    </div>
                </section>

                <section className={styles.sectionInfoClient}>
                    <h5 className={styles.subtitluSection}>Informații Client</h5>

                    <div className={styles.row}>
                        <span className={styles.label}>Nume Client: </span>
                        <span className={styles.value}>{data.clients?.numeComplet}</span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.label}>Email Client: </span>
                        <span className={styles.value}>{data.clients?.email}</span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.label}>Telefon Client: </span>
                        <span className={styles.value}>{data.clients?.telefon}</span>
                    </div>
                </section>

                <section className={styles.sectionInfoClient}>
                    <h5 className={styles.subtitluSection}>Informații Produs</h5>

                    <div className={styles.row}>
                        <span className={styles.label}>Nume Produs: </span>
                        <span className={styles.value}>{data.produse?.titlu}</span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.label}>Durata Produs: </span>
                        <span className={styles.value}>{data.produse?.durata || "--"}</span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.label}>Include: </span>
                        <span className={styles.value}>{data.produse?.includes || "--"}</span>
                    </div>
                </section>

                {contactatInfo.contactat ? (
                    <section className={styles.sectionInfoClient}>
                        <h5 className={styles.subtitluSection}>Client Contactat</h5>

                        <div className={styles.row}>
                            <span className={styles.label}>Data Contactare Client: </span>
                            <span className={styles.value}>
                                {contactatInfo.data 
                                    ? new Date(contactatInfo.data).toLocaleString('ro-RO', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                      }) 
                                    : "--"}
                            </span>
                        </div>

                        <div className={styles.row}>
                            <span className={styles.label}>Observații: </span>
                            <span className={styles.value}>{contactatInfo.observatii || "--"}</span>
                        </div>
                    </section>
                ) : (
                    <div className={styles.clientContactForm}>
                        <h6 className={styles.titluForm}>Contactează Clientul</h6>
                        
                        <form 
                        onSubmit={handleSetClientContacted}
                        className={styles.formContainer}
                        > 
                            <input type="hidden" value={data.id} name='idAchizitie'/>
                            <div className={styles.inputGroup}>
                                <label className={styles.labelForm}>Observații:</label>
                                <textarea 
                                    name='observatiiAchizitie' 
                                    rows={4} 
                                    className={styles.textareaAdmin}
                                    placeholder="Detalii despre discuția cu clientul..."
                                ></textarea>
                            </div>
                            <input 
                                type="submit" 
                                value="Am contactat clientul!" 
                                className={styles.btnSubmit}
                            />
                        </form>
                    </div>
                )}
            </div>
        </>
    );
}