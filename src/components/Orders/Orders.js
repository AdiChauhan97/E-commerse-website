import React, {useState, useEffect} from 'react';
import './Orders.css';
import {db} from '../../firebase';
import {useStateValue} from '../../StateProvider';
import Order from './Order/Order';
import { doc, collection } from '@firebase/firestore';
import {query, orderBy, onSnapshot} from 'firebase/firestore';

function Orders() {
    const [{ basket, user }, dispatch] = useStateValue();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if(user) {
            const docRef = doc(db, 'users', user?.uid)
            const usersCol = collection(docRef, 'orders')
            const q = query(usersCol, orderBy('created', 'desc'))
            onSnapshot(q, (snapshot) => {
                setOrders(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
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