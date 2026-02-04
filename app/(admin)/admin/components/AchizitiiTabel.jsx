"use client";

import { useState, useEffect } from 'react';
import { UserRoundCheck, Info, UserRoundX, ChevronLeft, ChevronRight, Search, RotateCcw } from 'lucide-react';
import './AchizitiiTabel.css'; 
import { getAchizitiiSuccess } from '../ServerActions/functions';
import BodyModal from './BodyModal';
import ModalAchizitie from './Modals/ModalAchizitie';
import { useRouter } from 'next/navigation';

export default function AchizitiiTabel({ initialData, initialCount }) {

    const router = useRouter();

    // --- STATE ---
    const [achizitii, setAchizitii] = useState(initialData || []);
    const [totalCount, setTotalCount] = useState(initialCount || 0);
    const [page, setPage] = useState(1);
    const pageSize = 10; 

    const [show, setShow] = useState(false);
    const [achizitie, setAchizitie] = useState(null);
    
    const [loading, setLoading] = useState(false);

    // Filtre (fara status, ca e doar success)
    const [filters, setFilters] = useState({
        email: '',
        id: '',
        idStripe: ''
    });

    const handleAchiztieClick = (item) =>{
        setShow(true);
        setAchizitie(item)
    }

    useEffect(() => {
        setAchizitii(initialData);
    }, [initialData]);


    // --- LOGICA ---

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    async function fetchData(currentFilters, pageNumber) {
        setLoading(true);
        const response = await getAchizitiiSuccess(currentFilters, pageNumber);
        
        if (response.data) setAchizitii(response.data);
        if (response.count !== null) setTotalCount(response.count);
        
        setLoading(false);
    }

    // SEARCH
    async function handleSearch(e) {
        e.preventDefault();
        setPage(1);
        await fetchData(filters, 1);
    }

    // RESET
    async function handleReset() {
        const cleanFilters = { email: '', id: '', idStripe: ''};
        setFilters(cleanFilters);
        setPage(1);
        await fetchData(cleanFilters, 1);
    }

    // PAGINARE
    async function changePage(newPage) {
        const totalPages = Math.ceil(totalCount / pageSize);
        if (newPage < 1 || (newPage > totalPages && totalCount > 0)) return;

        setPage(newPage);
        await fetchData(filters, newPage);
    }

    const totalPages = Math.ceil(totalCount / pageSize);

    return(
        <>

        <BodyModal
            show={show}
            close={() => setShow(false)}
            continutModal={<ModalAchizitie
                                data={achizitie}
                                onSuccess={() => {
                                    router.refresh();
                                }}
                            />}
            widthContinut={1000}
        />


          <div className="containerAdmin">
            <h1>Comenzi</h1>
            
            <form 
                onSubmit={handleSearch} 
                className="containerFiltre"
            >
                <input 
                    name="email" 
                    value={filters.email}
                    onChange={handleInputChange}
                    placeholder="Cauta email client" 
                    className="input-admin"
                />
                <input 
                    name="id" 
                    value={filters.id}
                    onChange={handleInputChange}
                    placeholder="Cauta ID Achizitie (UUID)" 
                    className="input-admin"
                />

                <input 
                    name="idStripe" 
                    value={filters.idStripe}
                    onChange={handleInputChange}
                    placeholder="Cauta ID Stripe" 
                    className="input-admin"
                />

                <button type="submit" className="btn-cauta" >
                    <Search size={16}/> Caută
                </button>

                <button 
                    type="button" 
                    onClick={handleReset}
                >
                    <RotateCcw size={16}/> Reset
                </button>
            </form>

            {loading ? (
              <div style={{textAlign: 'center', padding: '40px'}}>
                  <span className="loader"></span> Se încarcă...
              </div>
            ) : (
                <>
                <div className='tableWrapper'>
                    <table>
                        <thead>
                            <tr>
                        <th className='colID'>ID</th>
                        <th className="colStripe">ID Stripe</th>
                        <th>Pachet <br/> Achizitionat</th>
                        <th className="colEmail">Email</th>
                        <th className="colPrice">Valoare <br/> RON</th>
                        <th className="colDate">Data Achizitie</th>
                        <th className="colClientCheck">Contactat</th>
                        <th className="colDetalii">Detalii</th>
                            </tr>
                        </thead>
                        <tbody>
                            {achizitii && achizitii.length > 0 ? (
                            achizitii.map((item) => (
                                <tr key={item.id}>
                                    <td className="colID">{item.id}</td>
                                    <td className='colStripe'>{item.last_payment_intent_id}</td>
                                    <td>{item.produse.titlu}</td>
                                    <td className="colEmail">{item.clients.email}</td>
                                    <td className="colPrice">{item.produse.pret}</td>
                                    <td className='colDate'>
                                        {new Date(item.updated_at).toLocaleString('ro-RO', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </td>
                                    <td className='colClientCheck'>
                                        {item.client_contactat ? 
                                        (<UserRoundCheck size={40} color='green'/>) :
                                        (
                                        <UserRoundX size={40} color={"red"}/>
                                        )
                                    }
                                    </td>
                                    <td className='colDetalii'  onClick={() => handleAchiztieClick(item)} style={{ cursor: 'pointer' }}>
                                        <Info/>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" style={{textAlign: 'center', padding: '30px'}}>
                                    Nu există comenzi reușite.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>

                {totalCount > 0 && (
                    <div className="paginare-container" style={{display:'flex', justifyContent:'center', alignItems:'center', gap:'15px', marginTop:'20px'}}>
                        <button 
                            type="button"
                            onClick={() => changePage(page - 1)} 
                            disabled={page === 1}
                            style={{padding:'5px 10px', cursor: page === 1 ? 'not-allowed' : 'pointer', display:'flex', alignItems:'center'}}
                        >
                           <ChevronLeft size={16}/> Prev
                        </button>
                        
                        <span>Pagina <strong>{page}</strong> din {totalPages}</span>

                        <button 
                            type="button"
                            onClick={() => changePage(page + 1)} 
                            disabled={page >= totalPages}
                            style={{padding:'5px 10px', cursor: page >= totalPages ? 'not-allowed' : 'pointer', display:'flex', alignItems:'center'}}
                        >
                           Next <ChevronRight size={16}/>
                        </button>
                    </div>
                )}
                </>
            )}
          </div>
        </>
    )
}
