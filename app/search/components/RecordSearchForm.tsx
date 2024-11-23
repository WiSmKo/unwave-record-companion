'use client';

import { ReleaseData, findRelease } from "@/app/search/discogs-service";
import { Album } from "@/app/transfer-objects/Album";
import { Pagination } from "@/app/transfer-objects/Pagination";
import { useForm, SubmitHandler } from "react-hook-form";
import { title } from "process";
import { useState } from "react";
import { set } from "mongoose";

interface LookUpFormProps {
    onRecordSearch: (findRecordResponse: ReleaseData) => void;
  }

  interface FormData {
    term: string;
  }

  export default function LookUpForm({onRecordSearch}: LookUpFormProps) {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset, formState: { errors }, setError } = useForm<FormData>({reValidateMode: 'onSubmit'});
  
    const onSubmit: SubmitHandler<FormData> = async (data) =>{
  
        let title: string;
        let artist: string;
        const VALIDATION_MESSAGE : string = "Search term is empty"
        
        if (!data.term.trim()) {
            setError("term", { type: "manual", message: VALIDATION_MESSAGE });
            return;
        }

        const terms = data.term.split(",");

        if (terms.length < 1 || terms.length > 2) {
            setError("term", { type: "manual", message: "Invalid number of terms" });
            return;
        }

        if (terms.length >= 1) {
            title = terms[0].trim();
        }

        if (terms.length >= 2) {
            artist = terms[1].trim();
        }
  
        setLoading(true);
        try {
            console.log(`Finding release with query - title: ${title}, artist: ${artist}`);
            const response = await findRelease(title, artist);
            onRecordSearch(response);
        } catch (error) {
            setError("term", { type: "manual", message: error.message });
        }finally {
            setLoading(false);
        }
  
    };
  
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center mb-4 tooltip" data-tip="Enter a title, you can improve the search by adding an artist name seperated by a comma (e.g. 'Paranoid, Black Sabbath')">
                <input 
                    type="text" 
                    className="input block w-full" 
                    placeholder="Ask me about your records" 
                    {...register("term")} 
                />
                
                <button 
                    className="btn btn-primary ml-2 group" 
                    type="submit"  
                >
                    {loading ? (
                        <span className="loading loading-spinner"></span>
                    ): (
                        "Search"
                    )}
                    </button>
                {errors.term && <p className="text-sm text-red-500">{errors.term.message}</p>}
            </div>
        </form>
    );
  }