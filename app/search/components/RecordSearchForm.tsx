'use client';

import { ReleaseData, findRelease } from "@/app/search/search-service";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

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
        
        if (!data.term.trim()) {
            setError("term", { type: "manual", message: "Search term is empty" });
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
            setError("term", { type: "manual", message: "Couldn't find release" });
        }finally {
            setLoading(false);
        }
  
    };
  
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            
            <label htmlFor="search" className="label">
                <span className="label-text">Album Search</span>
                <span 
                    data-tooltip-id="tooltip" 
                    className="label-text-alt tooltip badge badge-secondary badge-outline" 
                    data-tooltip-content="Search by the album title, the artist name is optional and should be separated by a comma (eg. Abbey Road, The Beatles)">
                        Help</span>
            </label>
            <div className="flex w-full space-x-2">
                <input 
                    id="search"
                    type="text" 
                    className="input input-bordered w-full" 
                    placeholder="Album name" 
                    {...register("term")} 
                />
                
                <button 
                    className="btn btn-primary flex items-center justify-center" 
                    type="submit"  
                >
                    {loading ? (
                        <span className="loading loading-spinner"></span>
                    ): (
                        <MagnifyingGlassIcon className="h-5 w-5" />
                    )}
                </button>
            </div>
                {errors.term && <p className="text-sm text-red-500">{errors.term.message}</p>}

        </form>
    );
  }