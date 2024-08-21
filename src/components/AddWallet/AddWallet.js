import React, { useEffect, useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import axiosInstance from '../../common/axios';
import useGet from '../../hooks/useGet';
import { formatAddWalletTableData, getErrors, hasData, toastDefault } from '../../utils/handler.utils';
import { transactionsTableColumns } from '../../utils/reactTableColumns';
import EditTransaction from '../AddWallet/EditTransaction';
import ListPerPage from '../ReactTables/ListPerPage';
import Pagination from '../ReactTables/Pagination';
import ReactTable from '../ReactTables/ReactTable';
import UiHandler from '../UiHandler';
Modal.setAppElement('#root')

function AddWallet() {
    const [currentPage, setCurrentPage] = useState(1)
    const [listPerPage, setListPerPage] = useState(10)
    const [uniqueState, setUniqueState] = useState(false)
    const [searchWalletInput, setSearchWalletInput] = useState('')
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [editRowId, setEditRowId] = useState(null)
    const [selectedRows, setSelectedRows] = useState({
        rowsId: {},
        selectedFlatRows: []
    })

    const [urlToFetch, setUrlToFetch] = useState(`admin/transaction?page=${currentPage}&limit=${listPerPage}&q=${searchWalletInput}`)
    const [transactionData, loading, error] = useGet(urlToFetch, '', uniqueState)
    const addWalletData = transactionData?.transactions

    useEffect(() => {
        setUrlToFetch(`admin/transaction?page=${currentPage}&limit=${listPerPage}&q=${searchWalletInput}`)
    }, [currentPage, listPerPage])

    useEffect(() => {
        if (!searchWalletInput) clearSearchHandler()
    }, [searchWalletInput])

    const searchWalletHandler = (e) => {
        setCurrentPage(1)
        e.preventDefault();
        if (!searchWalletInput) return false
        const totalLength = searchWalletInput.length;
        if (totalLength >= 8) {
            setUrlToFetch(`admin/transaction?q=${searchWalletInput}&page=${currentPage}&limit=${listPerPage}`)
        } else {
            setUrlToFetch(`admin/transaction?q=${searchWalletInput}&page=${currentPage}&limit=${listPerPage}`)
        }
    }

    const clearSearchHandler = () => {
        setSearchWalletInput('')
        setCurrentPage(1)
        setUrlToFetch(`admin/transaction?page=${currentPage}&limit=${listPerPage}&q=${searchWalletInput}`)
    }

    const openChangeStatusModal = async (transaction_id) => {
        const { value: status } = await Swal.fire({
            title: 'Change status',
            input: 'select',
            inputOptions: {
                completed: 'Completed',
                pending: 'Pending',
                cancel: 'Cancel',
            },
            inputPlaceholder: 'Select a status',
            confirmButtonText: "Update",
            showCancelButton: true,
            inputValidator: (value) => {
                return new Promise((resolve) => {
                    if (value) {
                        resolve()
                    } else {
                        resolve('Select an option to update')
                    }
                })
            }
        })


        if (status) {
            toast.promise(
                axiosInstance.post('/admin/transaction/update', {
                    transaction_id: transaction_id.value,
                    status: status,
                }),
                {
                    pending: 'Updating transaction...',
                    error: {
                        render({ data }) {
                            return getErrors(data, false, true)
                        }
                    },
                    success: {
                        render() {
                            setUniqueState(prev => !prev)
                            return 'Transaction updated successfully'
                        }
                    }
                },
                toastDefault
            )
        }
    }

    let editButton = {
        id: 'edit',
        Header: "Action",
        accessor: 'id',
        Cell: (e) => {
            return <ul className="flex space-x-2">
                {e.row.original.status === 'pending' && (
                    <li className="cstm_btn_small" onClick={() => openChangeStatusModal(e)}>
                        Edit Status
                    </li>
                )}
                <li onClick={() => editRowHandler(e.value)} className="bg-gray-200 hover:bg-gray-400 cursor-pointer w-8 h-8 rounded-full overflow-hidden flex items-center justify-center p-1 ">
                    <FaEllipsisV />
                </li>
            </ul>

        }
    };

    let withEditButton = [...transactionsTableColumns, editButton]

    const cancelAllHandler = () => {
        if (window.confirm('Are you sure')) {



            toast.promise(
                axiosInstance.post('admin/transaction/cancel-all'),
                {
                    pending: 'Cancelling transaction...',
                    error: {
                        render(err) {
                            console.log(err);
                            return getErrors(err.data, false, true)
                        }
                    },
                    success: {
                        render(res) {
                            setUniqueState(prev => !prev);
                            return `Total cancelled ${res?.data?.data?.data?.total} transaction.`
                        }
                    }
                },
                toastDefault
            )
        }
    }

    const completeAllHandler = () => {
        toast.promise(
            axiosInstance.post('admin/transaction/complete-selected-all', {
                transaction_ids: selectedRows.selectedFlatRows.map(e => e.original.id)
            }),
            {
                pending: 'Completing all selected transaction...',
                error: {
                    render(err) {
                        console.log(err);
                        return getErrors(err.data, false, true)
                    }
                },
                success: {
                    render(res) {
                        setSelectedRows({
                            rowsId: {},
                            selectedFlatRows: []
                        })
                        setUniqueState(prev => !prev);
                        return `Total completed ${res?.data?.data?.data} transaction.`
                    }
                }
            },
            toastDefault
        )
    }

    const editRowHandler = (id) => {
        setIsOpenModal(true)
        setEditRowId(id)
    }



    return (
        <>
            <Modal
                isOpen={isOpenModal}
                onRequestClose={() => setIsOpenModal(false)}
                style={{
                    overlay: {
                        background: 'rgba(0,0,0,0.7)'
                    }
                }}
            >
                {editRowId &&
                    <EditTransaction
                        transactionId={editRowId}
                        onComplete={() => {
                            setIsOpenModal(false); setUniqueState((prev) => !prev)
                        }}
                    />
                }
            </Modal>
            <section className="relative container_admin" >
                <div className="bg-white overflow-hidden rounded">
                    <div className="px-6 py-3 border-b border-gray-200 flex flex-wrap justify-start items-center md:justify-between gap-y-4 md:gap-y-0">
                        <div className="flex items-center space-x-3 flex-wrap" >
                            <h3 className="text-lg font-bold text-black">
                                Add Wallet
                                {/* {<span className="text-base ml-2 text-blue-600 font-semibold">Total order {transactionData?.total}</span>} */}
                            </h3>
                            <button className="cstm_btn_small !bg-red-500 hover:!bg-red-700" onClick={cancelAllHandler}>Cancel All</button>
                        </div>

                        <div className="w-full md:w-auto flex gap-2">
                            {hasData(selectedRows?.selectedFlatRows) && <button className="cstm_btn_small" onClick={completeAllHandler}>Complete All</button>}
                            <form onSubmit={searchWalletHandler} className="flex items-center space-x-2">
                                <input value={searchWalletInput} onChange={(e) => setSearchWalletInput(e.target.value)} type="text" placeholder="Search" className="form_input mb-0 w-full" />
                                {searchWalletInput && <button onClick={clearSearchHandler} type="button" className="cstm_btn !py-[7px] !rounded">Clear</button>}
                            </form>
                        </div>
                    </div>
                    <div>
                        <div className="relative min-h-[100px]">
                            <UiHandler data={addWalletData} loading={loading} error={error} />
                            {hasData(addWalletData, error) && (
                                <ReactTable isSelectableRow selectedRows={selectedRows} setSelectedRows={setSelectedRows} tableId="add_wallet_table" columns={withEditButton} data={formatAddWalletTableData(addWalletData)} />
                            )}
                        </div>
                        {Array.isArray(addWalletData) && (
                            <div className="flex flex-wrap items-center justify-center md:justify-between px-6 py-4 border-t border-gray-200 gap-4">
                                <Pagination setCurrentPage={setCurrentPage} page={currentPage} listPerPage={listPerPage} totalList={transactionData.total} />
                                <ListPerPage listPerPage={listPerPage} setListPerPage={setListPerPage} />
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}

export default AddWallet
