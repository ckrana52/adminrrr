import React, { useRef, useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../../common/axios';
import useGet from '../../hooks/useGet';
import { getErrors, hasData, toastDefault } from '../../utils/handler.utils';
import Loader from '../Loader/Loader';
function EditPackage(props) {
    const history = useHistory()
    const packageId = props.match.params.id;
    const [uniqueState] = useState(false)
    const [loading, setLoading] = useState(null)
    const [data, loadingData] = useGet(`admin/topup-package/${packageId}`, '', uniqueState)
    const [products, loadingProducts] = useGet(`admin/topup-products`, '', uniqueState)
    const [vouchers,loadingVoucher] = useGet(`admin/topup-packages/9`, '', uniqueState)

    const product_id = useRef(null);
    const name = useRef(null);
    const sell_price = useRef(null);
    const buy_price = useRef(null);
    const admin_com = useRef(null);
    const tag = useRef(null);
    const is_auto = useRef(null);
    const in_stock = useRef(null);
    const sortOrder = useRef(null);
    const voucher_ids = useRef(null);

    const editPackageHandler = (e) => {
        e.preventDefault()
        setLoading(true)
        axiosInstance.post(`/admin/topup-package/update/${packageId}`, {
            product_id: product_id.current.value,
            name: name.current.value,
            price: sell_price.current.value,
            buy_price: buy_price.current.value,
            admin_com: admin_com.current.value,
            tag: tag.current.value,
            sort_order: sortOrder.current.value,
            is_auto: is_auto.current.checked ? 1 : 0,
            voucher_id: voucher_ids.current.value,
            in_stock: in_stock.current.checked ? 1 : 0,
        }).then(res => {
            toast.success('Topup package updated successfully', toastDefault)

            setTimeout(() => {
                history.push('/topup-packages')
            }, 1500);
        }).catch(err => {
            toast.error(getErrors(err, false, true), toastDefault)
            setLoading(false)
        })
    }

    return (
        <section className="relative container_admin" >
            <div className="bg-white overflow-hidden rounded">
                <div className="px-6 py-3 border-b border-gray-200">
                    <h3 className="text-lg font-bold text-black">
                        Edit topup package -- {data?.name}
                    </h3>
                </div>
                <div className="py-10 px-4" >
                    <div className="w-full md:w-[70%] min-h-[250px] mx-auto py-6 relative border border-gray-200 px-4">
                        {loadingData || loading || loadingProducts || loadingVoucher ? <Loader absolute /> : ''}
                        {hasData(data) && hasData(products) && hasData(vouchers) &&
                            <form onSubmit={editPackageHandler} >
                                <div>
                                    <div className="form_grid">
                                        <div>
                                            <label htmlFor="name">Product</label>
                                            <select defaultValue={data?.product_id} ref={product_id} className="form_input">
                                                {
                                                    products?.map(product => (
                                                        <option key={product.id} value={product.id}>{product.name}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="name">Name</label>
                                            <input ref={name} id="name" defaultValue={data?.name} className="form_input" type="text" placeholder="Name" required />
                                        </div>
                                    </div>
                                    <div className="form_grid">
                                        <div>
                                            <label htmlFor="sell_price">Sell price</label>
                                            <input ref={sell_price} step="any" id="sell_price" defaultValue={data?.price} className="form_input" type="number" placeholder="Sell price" required />
                                        </div>
                                        <div>
                                            <label htmlFor="buy_price">Buy price</label>
                                            <input ref={buy_price} id="buy_price" defaultValue={data?.buy_price} className="form_input" type="number" placeholder="Buy price" required />
                                        </div>
                                    </div>

                                    <div className="form_grid">
                                        <div>
                                            <label htmlFor="sort_order">Sort Order</label>
                                            <input ref={sortOrder} id="sort_order" defaultValue={data?.sort_order} className="form_input" type="text" placeholder="Name" required />
                                        </div>

                                        <div>
                                            <label htmlFor="sort_order">admin_com</label>
                                            <input ref={admin_com} id="sort_order" defaultValue={data?.admin_com} className="form_input" type="text" placeholder="Name" required />
                                        </div>
                                    
                                    </div>

                                    <div className="form_grid">
                                        <div>
                                            <label htmlFor="names">Vouchers</label>
                                            <select defaultValue={data.voucher_id} ref={voucher_ids} className="form_input">
                                                <option value={0}>select</option>
                                                {
                                                    vouchers?.map(bbbbbb => (
                                                        <option key={bbbbbb.id} value={bbbbbb.id} >{bbbbbb.name}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="sort_order">Tag</label>
                                            <input ref={tag} id="sort_order" defaultValue={data?.tag} className="form_input" type="text" placeholder="Name" />
                                        </div>
                                    </div>

                                    <div className="form_grid">
                                        <div>
                                            <label className="inline-flex items-center">
                                                <input ref={in_stock} id="in_stock" value="1" className="form-checkbox" type="checkbox" defaultChecked={data?.in_stock == 1 ? true : false} />
                                                <span className="ml-2">In Stock</span>
                                            </label>
                                        </div>

                                        <div>
                                            <label className="inline-flex items-center">
                                                <input ref={is_auto} id="is_auto" value="1" className="form-checkbox" type="checkbox" defaultChecked={data?.is_auto == 1 ? true : false} />
                                                <span className="ml-2">Is Auto</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div>
                                        <button type="submit" className="cstm_btn w-full block">Edit package</button>
                                    </div>
                                </div>
                            </form>
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default withRouter(EditPackage)
