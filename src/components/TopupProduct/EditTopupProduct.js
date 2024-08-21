import { convertFromHTML, convertToHTML } from 'draft-convert';
import { EditorState } from 'draft-js';
import React, { useEffect, useRef, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { useHistory, withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../../common/axios';
import useGet from '../../hooks/useGet';
import useUpload from '../../hooks/useUpload';
import { getErrors, hasData, toastDefault } from '../../utils/handler.utils';
import Loader from '../Loader/Loader';
function EditTopupProduct(props) {
    const history = useHistory()
    const productId = props.match.params.id;

    const [loading, setLoading] = useState(null)
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [data, loadingData, error] = useGet(`admin/topup-product/${productId}`)
    const [productLogo, setProductLogo] = useState(data?.logo)
    const { path, uploading } = useUpload(productLogo)

    useEffect(() => {
        if (hasData(data)) {
            setEditorState(
                EditorState.createWithContent(convertFromHTML(data?.rules))
            )
        }
    }, [data])

    const name = useRef(null);
    const logo = useRef(null);
    const type = useRef(null);
    const is_active_product = useRef(null);
    const sortOrder = useRef(null);
    const redeemLink = useRef(null);
    const videoLink = useRef(null);

    const editProductHandler = (e) => {
        e.preventDefault()
        setLoading(true)
        axiosInstance.post(`/admin/topup-product/update/${productId}`, {
            name: name.current.value,
            logo: path || data?.logo,
            rules: convertToHTML(editorState.getCurrentContent()),
            topup_type: type.current.value,
            sort_order: sortOrder.current.value,
            redeem_link: redeemLink.current.value,
            video_link: videoLink.current.value,
            is_active: is_active_product.current.checked ? 1 : 0,
        }).then(res => {
            toast.success('Product updated successfully', toastDefault)

            setTimeout(() => {
                history.push('/topup-product')
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
                        Edit product {`{ ${data?.name} }`}
                    </h3>
                </div>
                <div className="py-10 px-4" >
                    <div className="w-full md:w-[70%] mx-auto py-6 relative border border-gray-200 px-4">
                        {loadingData && <Loader absolute />}
                        {loading && <Loader absolute />}

                        <form onSubmit={editProductHandler} >
                        {
                                hasData(data, loading, error) && (
                                    <div>
                                        <div className="form_grid">
                                            <div>
                                                <label htmlFor="name">Name</label>
                                                <input ref={name} id="name" defaultValue={data?.name} className="form_input" type="text" placeholder="Name" required />
                                            </div>
                                            <div>
                                                <label htmlFor="logo">Logo</label>
                                                <input ref={logo} id="logo" className="form_input" type="file" onChange={e => setProductLogo(e.target.files[0])} />
                                            </div>
                                        </div>

                                        <div className="form_grid">
                                            <div>
                                                <label htmlFor="redeem_link">Redeem Link</label>
                                                <input ref={redeemLink} id="redeem_link" defaultValue={data?.redeem_link} className="form_input" type="text" placeholder="Redeem Link" />
                                            </div>

                                            <div>
                                                <label htmlFor="video_link">Video Link</label>
                                                <input ref={videoLink} id="video_link" defaultValue={data?.video_link} className="form_input" type="text" placeholder="Video Link" />
                                            </div>
                                        
                                        </div>

                                        <div className="form_grid">
                                            <div>
                                                <label htmlFor="sort_order">Sort Order</label>
                                                <input ref={sortOrder} id="sort_order" defaultValue={data?.sort_order} className="form_input" type="text" placeholder="Name" required />
                                            </div>
                                        
                                        </div>

                                        <Editor
                                            editorState={editorState}
                                            editorStyle={{
                                                height: 300,
                                            }}
                                            wrapperStyle={{
                                                border: '1px solid #dcdcf3',
                                                borderRadius: 6
                                            }}
                                            onEditorStateChange={(e) => setEditorState(e)}
                                        />

                                        <div className="my-2" >
                                            <div class="relative">
                                                <select ref={type} id="type" defaultValue={data?.topup_type} class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                    <option value="in_game">In game</option>
                                                    <option value="id_code">ID Code</option>
                                                    <option value="voucher">Vouchers</option>
                                                </select>
                                                
                                            </div>
                                        </div>

                                        
                                        <div className="my-2" >
                                            <label className="py-2 inline-block cursor-pointer select-none" >
                                                <input type="checkbox" defaultChecked={data?.is_active == 1} ref={is_active_product} className="mr-2" />
                                                Is active product
                                            </label>
                                        </div>

                                        <div>
                                            <button disabled={uploading} type="submit" className="cstm_btn w-full block">Edit Product</button>
                                        </div>
                                    </div>
                                )
                            }
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default withRouter(EditTopupProduct)
