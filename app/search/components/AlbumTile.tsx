'use client'

import Image from 'next/image';
import { ReleaseData } from '../search-service';

interface AlbumTileProps {
    findRecordResponse: ReleaseData
  }

export default function AlbumTile(props: AlbumTileProps) {
    return (
        <><div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 h-full">
                {/* Album art */}
                {<Image src={props.findRecordResponse.image} alt={`Album art for ${props.findRecordResponse.title}`} className='h-full object-cover rounded-lg' layout="responsive" width={600} height={600}/>}
            </div>

            <div className="md:w-1/2 md:pl-4 text-left ml-0">
                {/* Album details */}
                <h2 className="text-lg font-bold">{props.findRecordResponse.title}</h2>
                <p className="text-sm">Artist: {props.findRecordResponse.artists}</p>
                <p className="text-sm">Year: {props.findRecordResponse.year}</p>
                <p className="text-sm">Price range: {props.findRecordResponse.latestPriceSuggestion?.toFixed(2) ?? 'N/A'}-{props.findRecordResponse.originalPriceSuggestion?.toFixed(2) ?? 'N/A'}</p>
                <div className="pt-4 flex flex-wrap justify-center gap-5">
                    {props.findRecordResponse.genres.map((genre, index) => (
                        <span className="badge badge-success gap-2">{genre}</span>
                    ))}
                </div>
            </div>
        </div><div className="mt-4">
                {/* Album description */}
                <div className=''>
                    <p>{props.findRecordResponse.summary}</p>
                </div>

            </div></>
        
    )
}
