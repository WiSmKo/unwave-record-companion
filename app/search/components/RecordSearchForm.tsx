'use client';

import { ReleaseData, findRelease } from "@/app/search/discogs-service";
import { Album } from "@/app/transfer-objects/Album";
import { Pagination } from "@/app/transfer-objects/Pagination";
import { useForm, SubmitHandler } from "react-hook-form";
import { title } from "process";

interface LookUpFormProps {
    onRecordSearch: (findRecordResponse: ReleaseData) => void;
  }

  interface FormData {
    term: string;
  }

  export default function LookUpForm({onRecordSearch}: LookUpFormProps) {
    const { register, handleSubmit, reset, formState: { errors }, setError } = useForm<FormData>({reValidateMode: 'onSubmit'});
    const server = process.env.NEXT_PUBLIC_SERVER;
  
    const onSubmit: SubmitHandler<FormData> = async (data) =>{
  
        let title: string;
        let artist: string;
        const VALIDATION_MESSAGE : string = "Search term is empty"
        
        if (!data.term) {
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
  
        try {
            console.log(`Finding release with query - title: ${title}, artist: ${artist}`);
            const response = await findRelease(title, artist);
            onRecordSearch(response);
        } catch (error) {
            console.error('There was an error.', error);
        }
  
    };
  
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Stick it in:
                <input type="text" className="form-input block" placeholder="Title, Artist (comma seperated)" {...register("term")} />
                {errors.term && <p className="text-sm text-red-500">{errors.term.message}</p>}
                </label>
            </div>
        </form>
    );
  }