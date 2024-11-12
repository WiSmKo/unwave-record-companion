'use client';

import { Album } from "@/app/transfer-objects/Album";
import { Pagination } from "@/app/transfer-objects/Pagination";
import { useForm, SubmitHandler } from "react-hook-form";

interface RecordSearchFormProps {
  onRecordSearch: (albums: Album[], pagination: Pagination) => void;
}

interface FormData {
  artist: string;
  title: string;
  year?: string;
  label?: string;
  country?: string;
  catno?: string;
}

export default function RecordSearchForm({ onRecordSearch} : RecordSearchFormProps){
  const { register, handleSubmit, reset, formState: { errors }, setError } = useForm<FormData>({reValidateMode: 'onSubmit'});
  const server = process.env.NEXT_PUBLIC_SERVER;

  const onSubmit: SubmitHandler<FormData> = async (data) =>{

    const VALIDATION_MESSAGE : string = "One of required"
    
    if (!data.artist && !data.title && !data.catno) {
      if (!data.artist) {
        setError("artist", { type: "manual", message: VALIDATION_MESSAGE });
      }
      if (!data.title) {
        setError("title", { type: "manual", message: VALIDATION_MESSAGE });
      }
      if (!data.catno) {
        setError("catno", { type: "manual", message: VALIDATION_MESSAGE });
      }
      return;
    }

    const queryParams = new URLSearchParams();
    for (const [key, value] of Object.entries(data)) {
      if (value) {
        queryParams.append(key, String(value));
      }
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
        <label>Artist:
          <input type="text" className="form-input block" placeholder="Band or musician name" {...register("artist")} />
          {errors.artist && <p className="text-sm text-red-500">{errors.artist.message}</p>}
        </label>
        <label>
          Title:
          <input type="text" className="form-input block" placeholder="Album/single/record name" {...register("title")} />
          {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
        </label>
        <label>
          Year:
          <input type="text" className="form-input block" placeholder="Year your copy was published"
            {...register("year", {
              pattern: {
                value: /^\d{4}$/,
                message: "Year is not valid (yyyy)"
              }
            })} />
          {errors.year && <p className="text-sm text-red-500">{errors.year.message}</p>}
        </label>
        <label>
          Record Label:
          <input type="text" className="form-input block" placeholder="Record company name" {...register("label")} />
        </label>
        <label>
          Country:
          <input type="text" className="form-input block" placeholder="Country your copy was made" {...register("country")} />
        </label>
        <label>
          Catalogue Number:
          <input type="text" className="form-input block" placeholder="Catalogue number" {...register("catno")} />
          {errors.catno && <p className="text-sm text-red-500">{errors.catno.message}</p>}
        </label>
        <input type="submit" className="btn btn-primary btn-block" value="Find Records" />
        <input type="button" className="btn btn-secondary btn-block" value="Clear Form" onClick={() => reset()} />
      </div>
    </form>
  );
}