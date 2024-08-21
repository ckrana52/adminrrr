import Badge from '../components/Badge';
import ViewCompletedOrderByAdmin from '../components/Orders/ViewCompletedOrderByAdmin';
import ProductDescriptionSeeMore from '../components/ProductDescriptionSeeMore';
import { imgPath } from './handler.utils';

export const ordersTableColumns = [
    {
        Header: 'Order id',
        accessor: 'id',
    },
    {
        Header: 'User id',
        accessor: 'user_id',
    },
    // {
    //     Header: 'Ingame id',
    //     accessor: 'ingameid',
    // },
    {
        Header: 'Player id',
        accessor: 'playerid',
    },
    {
        Header: 'Password',
        accessor: 'ingamepassword',
    },
    {
        Header: 'Package name',
        accessor: 'name',
    },
    {
        Header: 'Price',
        accessor: 'amount',
    },
    {
        Header: 'Account type',
        accessor: 'accounttype',
    },
    {
        Header: 'Security code',
        accessor: 'securitycode',
    },
    {
        Header: 'Transaction id',
        accessor: 'transaction_id',
    },
    {
        Header: 'Phone',
        accessor: 'phone',
    },
    {
        Header: 'Voucher',
        accessor: 'Voucher.data',
    },
    {
        Header: 'Status',
        accessor: 'status',
        Cell: (e) => <Badge type={e.row.original['status']} />
    },
    {
        Header: 'Completed by',
        accessor: 'completed_by',
        Cell: (e) => {
            const admin = e.row.original?.Admin
            return <span className="capitalize" >{admin ? admin?.first_name + ' ' + admin?.last_name : '---'}</span>
        }
    },
    {
        Header: 'Created at',
        accessor: 'created_at',
    },
];

export const voucherStatTableColumns = [
    {
        Header: 'Name',
        accessor: 'name',
    
    },
    {
        Header: "Price",
        accessor: 'price',
        
    },
    {
        Header: "Available Voucher",
        accessor: 'voucher_count',
    },
    {
        Header: "Sell Today",
        accessor: 'today_sell',
    },
    {
        Header: "Sell Yesterday",
        accessor: 'yesterday_sell',
    },
];

export const TopupOrderMessageColums = [
    {
        Header: 'Order id',
        accessor: 'id',
    },
    {
        Header: 'Message',
        accessor: 'message',
    },
    
    {
        Header: 'Created at',
        accessor: 'created_at',
    },
];

export const authsTableColumns = [
    {
        Header: 'Id',
        accessor: 'id',
    },
    {
        Header: 'Name',
        accessor: 'name',
    },
    {
        Header: 'Slug',
        accessor: 'slug',
    },
    {
        Header: 'Description',
        accessor: 'description',
    },
    {
        Header: 'Status',
        accessor: 'status',
    },
    {
        Header: 'Auth URL',
        accessor: 'auth_url',
    },
];

export const adminsTableColumns = [
    {
        Header: 'Id',
        accessor: 'id',
    },
    {
        Header: 'First Name',
        accessor: 'first_name',
    },
    {
        Header: 'Last Name',
        accessor: 'last_name',
    },
    {
        Header: 'Username',
        accessor: 'username',
    },
    {
        Header: 'Gender',
        accessor: 'gender',
    },
    {
        Header: 'Date of birth',
        accessor: 'date_of_birth',
    },
    {
        Header: 'Image',
        accessor: 'image',
    },
    {
        Header: 'Email',
        accessor: 'email',
    },
    {
        Header: 'Phone',
        accessor: 'phone',
    },
];

export const transactionsTableColumns = [
    {
        Header: 'Id',
        accessor: 'id',
    },
    {
        Header: 'User Id',
        accessor: 'user_id',
    },
    {
        Header: 'Payment',
        accessor: 'payment_method_name',
    },
    {
        Header: 'Amount',
        accessor: 'amount',
    },
    {
        Header: 'Number',
        accessor: 'number',
    },
    {
        Header: 'TnxID',
        accessor: 'transaction_id',
    },
    {
        Header: 'Status',
        accessor: 'status',
    },
    {
        Header: 'Automated',
        accessor: 'is_automated',
        Cell: (e) => {
            return e.row.original.is_automated === 1 ? 'Automated' : 'Manual'
        }
    },
    {
        Header: 'Created at',
        accessor: 'created_at',
    },
    {
        Header: 'Updated at',
        accessor: 'updated_at',
    },

    // {
    //     Header: 'Purpose',
    //     accessor: 'purpose',
    // },

];

export const paymentMethodTableColumns = [
    {
        Header: 'Id',
        accessor: 'id',
    },
    {
        Header: 'Name',
        accessor: 'name',
    },
    {
        Header: 'Logo',
        accessor: 'logo_full_url',
        Cell: (e) => {
            return <img src={e.value} alt="" width={50} />
        }
    },
    {
        Header: 'Information',
        accessor: 'info',
    },
    {
        Header: 'Status',
        accessor: 'status',
    },
];

export const noticeTableColumns = [
    {
        Header: 'Id',
        accessor: 'id',
    },
    // {
    //     Header: 'Title',
    //     accessor: 'title',
    // },
    {
        Header: 'Image',
        accessor: 'image_full_url',
        Cell: (e) => {
            return <img src={e.value} alt="" width={50} />
        }
    },
    {
        Header: 'Link',
        accessor: 'link',
    },
    {
        Header: 'Notice',
        accessor: 'notice',
    },
    // {
    //     Header: 'Home modal',
    //     accessor: 'for_home_modal',
    // },
    // {
    //     Header: 'Template',
    //     accessor: 'template',
    // },
    {
        Header: 'Is Active',
        accessor: 'is_active',
    },
];

export const bannerTableColumns = [
    {
        Header: 'Id',
        accessor: 'id',
    },
    {
        Header: 'Note',
        accessor: 'note',
    },
    {
        Header: 'Link',
        accessor: 'link',
    },
    {
        Header: 'Image',
        accessor: 'banner_full_url',
        Cell: (e) => {
            return <img src={e.value} alt="" width={50} />
        }
    },

    {
        Header: 'Is Active',
        accessor: 'isactive',
    },
];

export const voucherTableColumns = [
    {
        Header: 'Id',
        accessor: 'id',
    },
    {
        Header: 'Voucher',
        accessor: 'data',
    },
    {
        Header: 'Used',
        accessor: 'is_used',
    },
    {
        Header: 'Used By',
        accessor: 'claim_by',
    },
];

export const userTableColumns = [
    {
        Header: 'Id',
        accessor: 'id',
    },
    {
        Header: 'Username',
        accessor: 'username',
    },
    {
        Header: 'Account status',
        accessor: 'account_status',
    },
    {
        Header: 'Is banned',
        accessor: 'is_banned',
    },
    {
        Header: 'Avatar',
        accessor: 'avatar',
        Cell: (e) => {
            return <img src={e.value} alt="" width={50} />
        }
    },
    {
        Header: 'Phone',
        accessor: 'phone',
    },
    {
        Header: 'Email',
        accessor: 'email',
    },
    {
        Header: 'Wallet',
        accessor: 'wallet',
    },
    {
        Header: 'Earn wallet',
        accessor: 'earn_wallet',
    },
    {
        Header: 'Scores',
        accessor: 'scores',
    },
    {
        Header: 'Provider',
        accessor: 'provider',
    },
    {
        Header: 'Is phone verify',
        accessor: 'is_phone_verify',
    },
    {
        Header: 'Created at',
        accessor: 'created_at',
    },
];

export const productTableColumns = [
    {
        Header: 'Id',
        accessor: 'id',
    },
    {
        Header: 'Name',
        accessor: 'name',
    },
    {
        Header: 'Logo',
        accessor: 'logo_full_url',
        Cell: (e) => {
            return <img src={e.value} alt="" width={50} className="bg-gray-300 min-h-[60px]" />
        }
    },
    {
        Header: 'Price/Stock',
        accessor: 'price',
    },
    {
        Header: 'Rules',
        accessor: 'rules',
        Cell: (e) => {
            return <ProductDescriptionSeeMore text={e.value} />
        }
    },
    {
        Header: 'Active for topup',
        accessor: 'is_idcode',
    },
    {
        Header: 'Created at',
        accessor: 'created_at',
    },
];

export const physicalProductTableColumns = [
    {
        Header: 'Id',
        accessor: 'id',
    },
    {
        Header: 'Name',
        accessor: 'name',
    },
    {
        Header: 'Image',
        accessor: 'image_full_url',
        Cell: (e) => {
            return <img src={e.value} alt="Img" style={{ minWidth: '60px', maxWidth: '60px', objectFit: 'cover' }} className="bg-gray-300 min-h-[60px]" />
        }
    },
    {
        Header: 'Sale Price',
        accessor: 'sale_price',
    },
    {
        Header: 'Regular Price',
        accessor: 'regular_price',
    },
    {
        Header: 'Description',
        accessor: 'description',
        Cell: (e) => {
            return <ProductDescriptionSeeMore text={e.value} />
        }
    },
    {
        Header: 'Is Active',
        accessor: 'is_active',
    },
    {
        Header: 'Created at',
        accessor: 'created_at',
    },
];

export const packageTableColumns = [
    {
        Header: 'Id',
        accessor: 'id',
    },
    {
        Header: 'Product',
        accessor: 'product_id',
    },
    {
        Header: 'Name',
        accessor: 'name',
    },
    {
        Header: 'Sale price',
        accessor: 'price',
    },
    {
        Header: 'Buy price',
        accessor: 'buy_price',
    },
    {
        Header: 'admin com',
        accessor: 'admin_com',
    },
    {
        Header: 'Auto',
        accessor: 'is_auto',
    },
];

export const completedOrderByAdminsTableColumns = [
    {
        Header: 'Name',
        accessor: 'username',
        Cell: (e) => {
            let data = e.row.original
            return <span style={{ textTransform: 'capitalize' }}>{data.first_name + ' ' + data.last_name}</span>
        }
    },
    {
        Header: "Today",
        accessor: 'id',
        Cell: (e) => {
            return e.row.original?.today_order || '---'
        }
    },
    {
        Header: "Monthly",
        accessor: 'monthly_order',
        Cell: (e) => {
            return e.row.original?.monthly_order || '---'
        }
    },
    {
        Header: "Total",
        accessor: 'total_order',
        Cell: (e) => {
            return e.row.original?.total_order || '---'
        }
    },
    {
        Header: "Details",
        Cell: (e) => {
            return <ViewCompletedOrderByAdmin data={e.row.original} />
        }
    }

];

export const shellUsedByAdminsTableColumns = [
    {
        Header: 'Name',
        accessor: 'username',
        Cell: (e) => {
            let data = e.row.original
            return <span style={{ textTransform: 'capitalize' }}>{data.first_name + ' ' + data.last_name}</span>
        }
    },
    {
        Header: "Shell Today",
        accessor: 'today_shell_used',
        Cell: (e) => {
            return e.row.original?.today_shell_used || '---'
        }
    },
    {
        Header: "Shell Yesterday",
        accessor: 'yesterday_shell_used',
        Cell: (e) => {
            return e.row.original?.yesterday_shell_used || '---'
        }
    },
    {
        Header: "Details",
        Cell: (e) => {
            return <ViewCompletedOrderByAdmin data={e.row.original} />
        }
    }

];

export const comUsedByAdminsTableColumns = [
    {
        Header: 'Name',
        accessor: 'username',
        Cell: (e) => {
            let data = e.row.original
            return <span style={{ textTransform: 'capitalize' }}>{data.first_name + ' ' + data.last_name}</span>
        }
    },
    {
        Header: "Total",
        accessor: 'today_shell_used',
        Cell: (e) => {
            return e.row.original?.today_shell_used || '---'
        }
    },


];


export const physicalProductOrderTableColumns = [
    {
        Header: 'Id',
        accessor: 'id',
    },
    {
        Header: 'Product id',
        Cell: (e) => e.row.original['product_id']
    },
    {
        Header: 'Product name',
        Cell: (e) => e.row.original['Product.name']
    },
    {
        Header: 'Image',
        Cell: (e) => <img style={{ width: '60px' }} src={imgPath(e.row.original['Product.image'])} alt="Img" />
    },
    {
        Header: 'Sale price',
        Cell: (e) => e.row.original['Product.sale_price']
    },
    {
        Header: 'Order Status',
        Cell: (e) => <Badge type={e.row.original['status']} />
    },
    {
        Header: 'User id',
        Cell: (e) => e.row.original['user_id']
    },
    {
        Header: 'Username',
        Cell: (e) => e.row.original['User.username']
    },
    {
        Header: 'Phone',
        Cell: (e) => e.row.original['User.phone']
    },
    {
        Header: 'Email',
        Cell: (e) => e.row.original['User.email']
    },
];

export const topupPaymentMethodsTableColumns = [
    {
        Header: 'Id',
        accessor: 'id',
    },
    {
        Header: 'Name',
        accessor: 'name',
    },
    {
        Header: 'Payment method',
        accessor: 'payment_method',
    },
];