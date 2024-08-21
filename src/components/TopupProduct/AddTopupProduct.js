import { convertToHTML } from 'draft-convert';
import { EditorState } from 'draft-js';
import React, { useRef, useState } from 'react';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../../common/axios';
import useUpload from '../../hooks/useUpload';
import { getErrors, toastDefault } from '../../utils/handler.utils';
import Loader from '../Loader/Loader';

function AddTopupProduct() {
    const name = useRef(null);
    const logo = useRef(null);
    const type = useRef(null);
    const is_active_product = useRef(null);
    const sortOrder = useRef(null);
    const redeemLink = useRef(null);
    const videoLink = useRef(null);

    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [productLogo, setProductLogo] = useState(null)
    const { path, uploading } = useUpload(productLogo)


    const [loading, setLoading] = useState(null)
    const history = useHistory()

    const createProductHandler = (e) => {
        e.preventDefault()

        if (!uploading) {
            setLoading(true)
            axiosInstance.post('/admin/topup-product/create', {
                name: name.current.value,
                logo: path,
                topup_type: type.current.value,
                is_active: is_active_product.current.checked ? 1 : 0,
                sort_order: sortOrder.current.value,
                redeem_link: redeemLink.current.value,
                video_link: videoLink.current.value,
                rules: convertToHTML(editorState.getCurrentContent()),
            }).then(res => {
                toast.success('Product created successfully', toastDefault)

                setTimeout(() => {
                    history.push('/topup-product')
                }, 1500);
            }).catch(err => {
                toast.error(getErrors(err, false, true), toastDefault)
                setLoading(false)
            })
        }
    }

    return (
        <section className="relative container_admin" >
            <div className="bg-white overflow-hidden rounded">
                <div className="px-6 py-3 border-b border-gray-200">
                    <h3 className="text-lg font-bold text-black">
                        Create new product
                    </h3>
                </div>
                <div className="py-10 px-4" >
                    <div className="w-full md:w-[70%] mx-auto py-6 relative border border-gray-200 px-4">
                        {loading && <Loader absolute />}
                        <form onSubmit={createProductHandler} >
                            <div>
                                <div className="form_grid">
                                    <div>
                                        <label htmlFor="name">Name</label>
                                        <input ref={name} id="name" className="form_input" type="text" placeholder="Name" required />
                                    </div>
                                    <div>
                                        <label htmlFor="logo">Logo</label>
                                        <input ref={logo} id="logo" className="form_input" type="file" required onChange={e => setProductLogo(e.target.files[0])} />
                                    </div>
                                </div>

                                <div className="form_grid">
                                    <div>
                                        <label htmlFor="redeem_link">Redeem Link</label>
                                        <input ref={redeemLink} id="redeem_link" className="form_input" type="text" placeholder="Redeem Link" />
                                    </div>

                                    <div>
                                        <label htmlFor="video_link">Video Link</label>
                                        <input ref={videoLink} id="video_link" className="form_input" type="text" placeholder="Video Link" />
                                    </div>
                                  
                                </div>

                                <div className="form_grid">
                                    <div>
                                        <label htmlFor="sort_order">Sort Order</label>
                                        <input ref={sortOrder} id="sort_order" className="form_input" type="text" placeholder="Name" defaultValue={1} required />
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
                                        <select ref={type} id="type" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                            <option value="in_game">In game</option>
                                            <option value="id_code">ID Code</option>
                                            <option value="voucher">Vouchers</option>
                                        </select>
                                        
                                    </div>
                                </div>
                                <div className="my-2" >
                                    <label className="py-2 inline-block cursor-pointer select-none" >
                                        <input type="checkbox" defaultChecked ref={is_active_product} className="mr-2" />
                                        Is active product
                                    </label>
                                </div>

                                <div>
                                    <button type="submit" disabled={uploading} className="cstm_btn w-full block">Create Product</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddTopupProduct
