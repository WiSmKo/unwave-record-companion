'use client'

import Image from 'next/image';
import { ReleaseData } from '../search-service';

interface AlbumTileProps {
    findRecordResponse: ReleaseData
  }

export default function AlbumTile(props: AlbumTileProps) {
    return (
        <><div className="card lg:card-side bg-base-100 shadow-xl">
            <figure>
                {/* Album art */}
                {<Image src={props.findRecordResponse.image} alt={`Album art for ${props.findRecordResponse.title}`} width={600} height={600} style={{width: '100%', height: 'auto'}}/>}
            </figure>

            <div className="card-body">
                {/* Album details */}
                <h2 className="card-title">{props.findRecordResponse.title}</h2>
                <p className="text-sm">by {props.findRecordResponse.artists}</p>
                <div className="stats">
                    <div className="stat">
                        <div className="stat-title">First released in</div>
                        <div className="stat-value text-indigo-800">{props.findRecordResponse.year}</div>
                    </div>
                </div>


                <p className="text-lg font-bold text-center">
                £{props.findRecordResponse.latestPriceSuggestion
                    ? `${Math.round(props.findRecordResponse.latestPriceSuggestion)}-${Math.round(props.findRecordResponse.originalPriceSuggestion)}`
                    : Math.round(props.findRecordResponse.originalPriceSuggestion)}
                </p>    

                <div className="pt-4 flex flex-wrap justify-center gap-5">
                    {props.findRecordResponse.genres.map((genre, index) => (
                        <span className="badge badge-success gap-2">{genre}</span>
                    ))}
                </div>
            </div>
        </div>
        <div className="mt-4">
            {/* Album description */}
            <div className=''>
                <p>{props.findRecordResponse.summary}</p>
            </div>
        </div></>
        
    )
}
