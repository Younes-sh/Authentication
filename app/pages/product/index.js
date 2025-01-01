import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Product () {

    const router = useRouter();
    
        useEffect(() => { 
            const token = localStorage.getItem('token');
             if (!token) { 
                router.push('/auth/login');
            } ;
        }, [router]); 

    return (
        <div className="container">
            <div className="main">
                <h1>Product Page</h1>
            </div>
        </div>
    )
}