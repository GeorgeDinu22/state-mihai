"use client";

import Button from '../components/button';
import BodyModal from '../components/BodyModal';
import { startTransition, useEffect, useState } from 'react';

import './components.css';

import * as Icons from "lucide-react";
import { Check } from 'lucide-react';

import ModalAddProduct from '../components/Modals/ModalAddProduct';
import ModalEditProduct from './Modals/ModalEditProduct';
import Card from "./Card";

import { Toaster, toast } from "react-hot-toast";

import {
  DndContext,
  closestCenter
} from "@dnd-kit/core";

import {
  SortableContext,
  rectSortingStrategy,
  arrayMove
} from "@dnd-kit/sortable";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SetOrdinePachete } from '../ServerActions/functions';
import LoadingOverlay from "@/app/(admin)/admin/components/LoadingOverlay";


export default function PacheteClient({data}){
 
      const [showAdd, setShowAdd] = useState(false);
      const [showEdit, setShowEdit] = useState(false);
      const [selectedProduct, setselectedProduct ] = useState(null);

      const produseList = data
      const [ordineProduse, setOrdineProduse] = useState(data);

      const [error, setError] = useState("");
      const [ordinePressed, setOrdinePressed] = useState(false);

      const [loading,setLoading] = useState(false);

      function openEdit(prod) {
        setselectedProduct(prod)
        setShowEdit(true);
    }

    useEffect(() => {
    setOrdineProduse(data);
  }, [data]);

    
    async function SaveOrdine(){

      const order = ordineProduse.map((prod, index) => ({
        id: prod.id,
        pozitie: index
      }));

      setLoading(true);

      startTransition(async() => {
       
        try{
          const res = await SetOrdinePachete(order);
          if(res.ok){
            toast.success("Ordinea pachetelor a fost setata cu succes!");
          }
          else{
            toast.error("Eroare: " + result.message);
          }
        } catch(err){
        toast.error("Eroare de server!");
      } finally{
        setLoading(false);
      }
      })
    }

    function SortableItem({ prod, children }) {
      const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: prod.id });

      const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        cursor: "grab"
      };

      return (
        <div
          ref={setNodeRef}
          style={style}
          {...attributes}
          {...listeners}
          className="itemOrdine"
        >
          {children}
        </div>
      );
    }


function handleDragEnd(event) {
  const { active, over } = event;

  if (!over || active.id === over.id) return;

  setOrdineProduse((items) => {
    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);

    return arrayMove(items, oldIndex, newIndex);
  });
}
    
    return(
            <>
            <div className="containerAdmin">

              <LoadingOverlay show={loading}/>
                
                 {/* MODAL ADAUGARE */}
                <BodyModal
                    show={showAdd}
                    close={() => setShowAdd(false)}
                    continutModal={<ModalAddProduct/>}
                    widthContinut={1000}
                />

                {/* MODAL EDITARE */}
                <BodyModal
                    show={showEdit}
                    close={() => setShowEdit(false)}
                    continutModal={<ModalEditProduct 
                        data = {selectedProduct}
                        closeModal = {() => setShowEdit(false)}
                    />}
                    widthContinut={1000}
                />

                    {
                      ordinePressed && (
                          <div className="modalOrdine">
                              <Toaster/>
                            <div onClick={() => setOrdinePressed(false)} className="closeModalOrdine">
                              &times;
                            </div>
                            <div className="containerOrdine">
                              <h2>Setează Ordinea Pachetelor</h2>

                            <div onClick={() => SaveOrdine()} className="setOrdine">
                              Seteaza Ordinea
                              <Check size={20} strokeWidth={4} color='#009dff'/>
                            </div>

                              <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                                <SortableContext
                                  items={ordineProduse.map((p) => p.id)}
                                  strategy={rectSortingStrategy}
                                >
                                  <div className="contentOrdine">
                                    {ordineProduse.map((prod) => (

                                     <SortableItem key={prod.id} prod={prod}>
                                       <Card prod={prod}/>
                                    
                                      </SortableItem>

                                    ))}
                                  </div>
                                </SortableContext>
                              </DndContext>
                            </div>
                          </div>
                      )
                    }



                
             <h1>Gestioneaza Produse</h1>
             {error && (
                <h3>{error}</h3>
             )}
    
             <div className="containerButtons">

             <div onClick={() => setOrdinePressed(true)} className="buttonOrdine">
                   <Icons.Shuffle />
                  Ordoneaza Pachete
                </div>

              <Button
                text="Aduaga Produs Nou"
                task={() => setShowAdd(true)}
                />
             </div>
                

                <div className="containerProduse">
                    {produseList?.length > 0 ? (
                        produseList.map((prod) => {
                
                const IconComponent = Icons[prod.icon] || Icons.Ban;

                const includeList = prod.includes?.split("\n").filter(i => i.trim().length > 0) || [];
                const excludeList = prod.exclued?.split("\n").filter(i => i.trim().length > 0) || [];


        return (  
            <div key={prod.id}
              className='card'
              onClick={() => openEdit(prod)}
              style={{ "--glow-color":prod.accentColor  }} 
            >

        {prod.isBestDeal && (
            <div className="bestValue">
                {prod.textBestDeal}
            </div>
        )}
        
    <div className={prod.isActive ? "contentWrapper" : "contentWrapper pachetInactiv"}
    style={{overflowY:"hidden"}}
    >
      

      <div className="iconCard">
        <IconComponent
          color={prod.accentColor}
          strokeWidth={1.5}
          size={32}
        />
      </div>


      <p className="titlu">{prod.titlu}</p>
      <p className="pret">{prod.pret} RON</p>
      {prod.durata && (
        <p className="durata">{prod.durata}</p>
      )}
      

      <ul className="includes">
        <p className="includedTitle">Include</p>
        {includeList.length > 0 ? 
        (
            includeList.map((item, i) => <li key={i}>{item}</li>)
        ) : (
            <li>Nu este setat nicun include</li>
        )
        }
      </ul>

      <ul className="excludes">
        <p className="excludedTitle">Exclude</p>
        {excludeList.length > 0 ? 
        (
            excludeList.map((item,i) => <li key={i}>{item}</li>)
        ) : 
        (<li>Nu este setat nicun exclude</li>)
        }
      </ul>

      <a className="cta">
        {prod.textBtn}
      </a>
    </div>

      {!prod.isActive && (
          <div className='backgroundInactiv'>
            <p>{prod.textInactiv}</p>
          </div>
        )}

    </div>
                )     
    })
                )
                : (
                    <p className='infoBlock'>
                        Nu exista produse!
                    </p>
                )
                }
                </div>
            </div>
               
            </>
        )
}