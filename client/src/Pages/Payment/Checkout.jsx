import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getRazorPayId, purchaseCourseBundle } from '../../../Redux/Slices/RazorpaySlice';
import toast from 'react-hot-toast';
import HomeLayout from '../../Layouts/HomeLayout';
import {BiRupee} from 'react-icons/bi'

const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const razorpayKey = useSelector((state) => state.razorpay.key);
    const subscription_id = useSelector((state) => state?.razorpay?.subscription_id);
    const isPaymentVerified = useSelector((state) => state?.razorpay?.isPaymentVerified);
    const userData = useSelector((state) => state?.auth?.data);

    const paymentDetails = {
        razorpay_payment_id: "",
        razorpay_subscription_id: "",
        razorpay_signature: ""
    };

    async function handleSubscription(e) {
        e.preventDefault();
        if (!razorpayKey || !subscription_id) {
            toast.error("Something went wrong!");
            return;
        }
        const option = {
            key: razorpayKey,
            subscription_id: subscription_id,
            name: "Coursify Pvt. Ltd.",
            description: "Coursify Subscription",
            theme: {
                color: '#F35274'
            },
            prefill: {
                email: userData?.email,
                name: userData?.fullName
            },
            handler: async function(response) {
                paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
                paymentDetails.razorpay_signature = response.razorpay_signature;
                paymentDetails.razorpay_subscription_id = response.razorpay_subscription_id;

                toast.success("Payment Successful");

                const res = await dispatch(purchaseCourseBundle(paymentDetails));
                (res?.payload?.success) ? navigate("/checkout/success") : navigate("/checkout/fail");
            }
        };
        const paymentObject =  window.Razorpay(option);
        paymentObject.open();
    }

    async function load() {
        await dispatch(getRazorPayId());
        await dispatch(purchaseCourseBundle());
    }

    useEffect(() => {
        load();
    }, []);

    return (
        <HomeLayout>
            <form
                onSubmit={handleSubscription}
                className='min-h-[90vh] flex items-center justify-center text-white '
            >
                <div className='w-80 h-[28rem] flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative'>
                    <h1 className='bg-yellow-500 w-full absolute top-0 text-center py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg '>Subscription Bundle</h1>
                    <div className='px-4 space-y-5 text-center'>
                        <p className='text-[17px]'>
                            This purchase will allow you to access all available courses of our platform for{" "}
                            <span className='text-yellow-500 font-bold '>
                                <br />
                                1 year duration
                            </span>
                            All the existing and new launched courses will be included in the bundle.
                        </p>
                        <p className='flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500'>
                            <BiRupee /> <span>499/- only</span>
                        </p>
                        <div className='text-gray-200'>
                            <p>100% refund on cancellation</p>
                            <p>*Terms and conditions apply*</p>
                        </div>
                        <button type='submit' className='bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 absolute bottom-0 left-0 right-0 text-xl font-bold rounded-bl-lg rounded-br-lg'>
                            Buy Now
                        </button>
                    </div>
                </div>
            </form>
        </HomeLayout>
    )
}


export default Checkout
