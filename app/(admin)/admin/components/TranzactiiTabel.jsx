"use client";

import { useState } from 'react';
import ModalTranzactie from './Modals/ModalTranzactie';
import './TranzactiiTabel.css';
import { Info, ChevronLeft, ChevronRight, Search, RotateCcw } from 'lucide-react'; // Am importat RotateCcw
import BodyModal from './BodyModal';
import { filtreazaTranzactii } from '../ServerActions/functions';

export default function TranzactiiTabel({ initialData, initialCount }) {

    const [tranzactii, setTranzactii] = useState(initialData || []);
    const [totalCount, setTotalCount] = useState(initialCount || 0);
    const [page, setPage] = useState(1);
    const pageSize = 10; 
    
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [tranzactieSelectata, setTranzactieSelectata] = useState(null);

    const [filters, setFilters] = useState({
        email: '',
        id_stripe: '',
        status: 'toate'
    });


    function HandleOptionsClick(item){
        setTranzactieSelectata(item);
        setShow(true);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    async function fetchData(currentFilters, pageNumber) {
        setLoading(true);
        const response = await filtreazaTranzactii(currentFilters, pageNumber);
        
        if (response.data) setTranzactii(response.data);
        if (response.count !== null) setTotalCount(response.count);
        
        setLoading(false);
    }

    async function handleSearch(e) {
        e.preventDefault();
        setPage(1);
        await fetchData(filters, 1);
    }

    async function handleReset() {
        const cleanFilters = { email: '', id_stripe: '', status: 'toate' };
        
        setFilters(cleanFilters);
        setPage(1);

        await fetchData(cleanFilters, 1);
    }

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
            continutModal={<ModalTranzactie tranzactie={tranzactieSelectata}/>}
            widthContinut={475}
        />

          <div className="containerAdmin">
            <h1>Tranzactii</h1>
            
            <form 
                onSubmit={handleSearch} 
                className="containerFiltre"
            >
                <input 
                    name="email" 
                    value={filters.email}
                    onChange={handleInputChange}
                    placeholder="Cauta email..." 
                    className="input-admin"
                />
                <input 
                    name="id_stripe" 
                    value={filters.id_stripe}
                    onChange={handleInputChange}
                    placeholder="ID Stripe..." 
                    className="input-admin"
                />
                <select 
                    name="status" 
                    value={filters.status}
                    onChange={handleInputChange}
                    className="select-admin"
                >
                    <option value="toate">Toate</option>
                    <option value="success">Success</option>
                    <option value="failed">Eșuată</option>
                </select>

                <button type="submit" className="btn-cauta">
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
              <div style={{textAlign: 'center', padding: '20px'}}>
                  <span className="loader"></span> Se încarcă...
              </div>
            ) : (
                <>
                <div className='tableWrapper'>
                <table>
                    <thead>
                        <tr>
                            <th className="colID">ID</th>
                            <th className="colStatus">Status</th>
                            <th>Email Client</th>
                            <th className="colStripe">ID Stripe</th>
                            <th className="colPrice">Suma (RON)</th>
                            <th className="colOraPlata">Data</th>
                            <th className="colOptions">Detalii</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tranzactii && tranzactii.length > 0 ? (
                        tranzactii.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.status_plata === "success" ? 
                                    <span className="statusBadgeTabel statusSuccess">✅ Success</span> :
                                    <span className="statusBadgeTabel statusFailed">❌ Eșuată</span>
                                    }
                                </td>
                                <td>{item.clients?.email || '-'}</td>
                                <td className='campIDStripe'>{item.payment_intent_id}</td>
                                <td>{item.pret / 100}</td>
                                <td>{new Date(item.created_at).toLocaleString("ro-RO")}</td>
                                <td onClick={() => HandleOptionsClick(item)} className='optiuniTranzactie'>
                                    <div><Info size={32}/></div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" style={{textAlign: 'center', padding: '20px'}}>
                                Nu s-au găsit tranzacții.
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