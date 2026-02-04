"use client";

import { useState, useTransition } from 'react';
import styles from './modal.module.css'; 
import * as Icons from "lucide-react";
import { deleteProduct, editProduct } from '../../ServerActions/functions';
import { Toaster, toast } from "react-hot-toast";
import LoadingOverlay from "@/app/(admin)/admin/components/LoadingOverlay";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ModalEditProduct({closeModal, data, refresh}) {
    
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [confirmDelete, setConfirmDelete] = useState(false);

  function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target);

    startTransition(async () => {
      try {
        const result = await editProduct(formData);
        if (result.ok) {
           toast.success("Produs editat cu succes!");
           router.refresh();
        } else {
          toast.error("Eroare: " + result.message);
        }
      } catch (err) {
        toast.error("Eroare de server!");
      } finally {
        setLoading(false);
      }
    });
  }

  async function handleDelete() {
    setLoading(true);
    try {
      const result = await deleteProduct(data.id);
      if (result.ok) {
        toast.success("Produs șters cu succes!");
        setTimeout(() => closeModal(), 850);
        router.refresh();
      } else {
        toast.error("Eroare: " + result.message);
      }
    } catch (error) {
      toast.error("Eroare de server!");
    } finally {
      setLoading(false);
    }
  }

  const [title, setTitle] = useState(data.titlu);
  const [pret, setPret] = useState(`${data.pret}`);
  const [durata, setDurata] = useState(`${data.durata}`);
  const [icon, setIcon] = useState(`${data.icon}`);
  const [include, setInclude] = useState(data.includes?.replace(/\r\n/g, "\n") || "");
  const [exclude, setExclude] = useState(data.exclued?.replace(/\r\n/g, "\n") || "");
  const [accentColor, setAccentColor] = useState(`${data.accentColor}`);
  const [isBestDeal, setIsBestDeal] = useState(data.isBestDeal);
  const [textBestDeal, setTextBestDeal] = useState(`${data.textBestDeal}`);
  const [textBtn, setTextBtn] = useState(`${data.textBtn}`);
  const [pachetActiv, setPachetActiv] = useState(data.isActive);
  const [textInactiv, setTextInactiv] = useState(data.textInactiv || "");

  const IconComponent = Icons[icon] || Icons.Ban;

  const includeList = include.split("\n").map((l) => l.trim()).filter((l) => l.length > 0);
  const excludeList = exclude.split("\n").map((l) => l.trim()).filter((l) => l.length > 0);

  return (
    <div style={{ width: "100%" }} className={styles.container}>
      <LoadingOverlay show={loading}/>
      <Toaster/>

      <form onSubmit={handleSubmit}>
        <h4>Editeaza Pachet  #{data.id}</h4>
        
        <div className={styles.formWrapper}>
          <label>Titlu</label>
          <input onChange={(e) => setTitle(e.target.value)} name="titlu" type="text" value={title} placeholder="Fitnes" />
        </div>
        
        <input type="hidden" value={data.id} name='idProdus'/>

         <div className={styles.formWrapper}>
          <label>Preț</label>
          <input onInput={(e) => setPret(e.target.value)} value={pret} type="number" name="pret" />
        </div>

        <div className={styles.formWrapper}>
          <label>Durata</label>
          <input onChange={(e) => setDurata(e.target.value)} value={durata}  type="text" name="durata" />
        </div>

        <div className={styles.formWrapper}>
          <label>Icon <Link target="_blank" rel="noopener noreferrer" className={styles.lucidReact} href="https://lucide.dev/icons/">(lucid-react)</Link></label>
          <input onChange={(e) => setIcon(e.target.value)} value={icon} name="icon" type="text" placeholder="Trophy" />
        </div>

        <div className={styles.formWrapper}>
          <label>Culoare Accent</label>
          <input onChange={(e) => setAccentColor(e.target.value)} value={accentColor}  type="color" name="accent_color" />
        </div>

         <div className={styles.formWrapper}>
          <label>Seteaza Banner</label>
          <div className={styles.wrapperBanner}>
            <input className={styles.checkBox} id='inputCheck' checked={isBestDeal} type="checkbox" onChange={(e) => setIsBestDeal(e.target.checked)} name='isBestDeal'/>
             <input onChange={(e) => setTextBestDeal(e.target.value)} value={textBestDeal}  type="text" name="text_banner"/>
          </div>
        </div>

        <div className={`${styles.formWrapper} ${styles.wrapperTextArea}`}>
          <label>Include:</label>
          <p>La final de fiecare rând apasă Enter</p>
          <textarea value={include} onInput={(e) => setInclude(e.target.value)} rows="6" name="include" />
        </div>

        <div className={`${styles.formWrapper} ${styles.wrapperTextArea}`}>
          <label>Exclude:</label>
          <p>La final de fiecare rând apasă Enter</p>
          <textarea value={exclude} onInput={(e) => setExclude(e.target.value)} rows="6" name="exclude" />
        </div>

         <div className={`${styles.formWrapper} ${styles.textButtonCTA}`}>
          <label>Text Button</label>
           <input onChange={(e) => setTextBtn(e.target.value)} value={textBtn}  type="text" name="textBtn"/>
        </div>

        <div className={`${styles.formWrapper} ${styles.toggleActivState}`}>
          <input type="hidden" value={pachetActiv} name='pachet_activ'/>
          <div 
            onClick={() => setPachetActiv(prev => !prev)} 
            className={pachetActiv ? `${styles.togglePachetActiv} ${styles.activ}` : `${styles.togglePachetActiv} ${styles.dezactivat}`}
          >
            {pachetActiv ? "Pachet Activ" : "Pachet Inactiv"}
          </div>
        </div>

        <div className={`${styles.formWrapper} ${styles.textInactiv}`}>
            <label>Text Inactiv</label>
             <input onChange={(e) => setTextInactiv(e.target.value)} value={textInactiv}  type="text" name="text_inactiv"/>
        </div>

        <div className={styles.bottomModal}>
            <button type="submit" className={styles.btnSubmit}>
              Editeaza Produs
            </button>
            <button className={styles.deleteBtn} type='button' onClick={() => setConfirmDelete(true)}>
              Sterge Produs
            </button>
        </div>
      </form>

      {confirmDelete && (
        <div className={styles.confirmOverlay}>
          <div className={styles.confirmModal}>
            <h4>Confirmare ștergere</h4>
            <p>
              Ești sigur că vrei să ștergi acest produs?  
              <br />
              <strong>Acțiunea este ireversibilă.</strong>
            </p>

            <div className={styles.confirmActions}>
              <button className={styles.btnCancel} onClick={() => setConfirmDelete(false)}>
                Anulează
              </button>
              <button
                className={styles.btnDelete}
                onClick={() => {
                  setConfirmDelete(false);
                  handleDelete();
                }}
              >
                Da, șterge
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        className={styles.card}
        style={ !pachetActiv ? { pointerEvents: "none", "--glow-color":accentColor } : { "--glow-color":accentColor  }} 
      >
        {isBestDeal && (
            <div className={styles.bestValue}>
                {textBestDeal}
            </div>
        )}
      
        <div className={pachetActiv ? styles.contentWrapper : `${styles.contentWrapper} ${styles.pachetInactiv}`}>
          <div className={styles.iconCard}>
            <IconComponent color={accentColor} strokeWidth={1.5} size={32} />
          </div>

          <p className={styles.titlu}>{title}</p>
          <p className={styles.pret}>{pret} RON</p>
          {durata && (
            <p className={styles.durata}>{durata}</p>
          )}

          <ul className={styles.includes}>
            <p className={styles.includedTitle}>Include</p>
            {includeList.length > 0 ? 
              includeList.map((item, i) => <li key={i}>{item}</li>)
              : <li>Nu este setat nicun include</li>
            }
          </ul>

          <ul className={styles.excludes}>
            <p className={styles.excludedTitle}>Exclude</p>
            {excludeList.length > 0 ? 
              excludeList.map((item,i) => <li key={i}>{item}</li>)
              : <li>Nu este setat nicun exclude</li>
            }
          </ul>

          <a className={styles.cta} href="#">
            {textBtn}
          </a>
        </div>

        {!pachetActiv && (
          <div className={styles.backgroundInactiv}>
            <p>{textInactiv}</p>
          </div>
        )}
      </div>
    </div>
  );
}