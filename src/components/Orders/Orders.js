import React, {useState, useEffect} from 'react';
import {db} from '../../firebase';
import {useStateValue} from '../../StateProvider';
import Order from './Order/Order';
// import { doc, collection } from '@firebase/firestore';
import {doc, collection, query, orderBy, onSnapshot} from 'firebase/firestore';
import './Orders.css';

function Orders() {
    const [{ basket, user }, dispatch] = useStateValue();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if(user) {
            const docRef = doc(db, 'users', user?.uid)
            const usersCol = collection(docRef, 'orders')
            const q = query(usersCol, orderBy('created', 'desc'))
            onSnapshot(q, (snapshot) => {
                setOrders(snapshot.docs.map(d => ({
                        id: d.id,
                        data: d.data()
                })))
            })
        } else {
            setOrders([])
        }

    }, [user])

    return (
        <div className='orders'>
             <h1>Your Orders</h1>
            <div className='orders__order'>
                {orders?.map(order => (
                    <Order order={order} />
                ))}
            </div>
        </div>
    )
}

export default Orders;