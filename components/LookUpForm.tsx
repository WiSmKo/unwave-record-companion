'use client';

import { Album } from "@/app/transfer-objects/Album";
import { Pagination } from "@/app/transfer-objects/Pagination";
import { useForm, SubmitHandler } from "react-hook-form";

interface LookUpFormProps {
    onRecordSearch: (albums: Album[], pagination: Pagination) => void;
  }

  interface FormData {
    term: string;
  }

  export default function LookUpForm({onRecordSearch}: LookUpFormProps) {
    const { register, handleSubmit, reset, formState: { errors }, setError } = useForm<FormData>({reValidateMode: 'onSubmit'});
    const server = process.env.NEXT_PUBLIC_SERVER;
  
    const onSubmit: SubmitHandler<FormData> = async (data) =>{
  
        const VALIDATION_MESSAGE : string = "Search term is empty"
        
        if (!data.term) {
            setError("term", { type: "manual", message: VALIDATION_MESSAGE });
            return;
        }


        const terms = data.term.split(",");

        if (terms.length < 1 || terms.length > 3) {
            setError("term", { type: "manual", message: "Invalid number of terms" });
            return;
        }

        const queryParams = new URLSearchParams();

        if (terms.length >= 1) {
            queryParams.append("title", terms[0].trim());
        }

        if (terms.length >= 2) {
            queryParams.append("artist", terms[1].trim());
        }

        if (terms.length === 3) {
            queryParams.append("year", terms[2].trim());
        }
    
        queryParams.append("per_page", "15");
  
        try {
            const response = await fetch(`${server}/bcs/find-records?${queryParams}`)
        
            if(!response.ok){
            throw new Error(`HTTP error - Status: ${response.status}`);
            }
    
            const data = await response.json();
            onRecordSearch(data.results, data.pagination);
            console.log(data);
        } catch (error) {
            console.error('There was an error.', error);
        }
  
    };
  
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Stick it in:
                <input type="text" className="form-input block" placeholder="Title, Artist, Year (comma seperated)" {...register("term")} />
                {errors.term && <p className="text-sm text-red-500">{errors.term.message}</p>}
                </label>
            </div>
        </form>
    );
  }