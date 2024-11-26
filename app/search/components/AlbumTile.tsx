'use client'

import Image from 'next/image';
import { ReleaseData } from '../search-service';

interface AlbumTileProps {
    findRecordResponse: ReleaseData
  }

export default function AlbumTile(props: AlbumTileProps) {
    return (
        <div className="w-full h-full overflow-hidden">
            { <Image src={props.findRecordResponse.image} alt={props.findRecordResponse.title} width={150} height={150}/> }
            <div className='ml-4'>
                <p><strong>{props.findRecordResponse.title}</strong></p>
                <p>Artist: {props.findRecordResponse.artists}</p>
                <p>Year: {props.findRecordResponse.year}</p>
                <p>Price range: {props.findRecordResponse.latestPriceSuggestion?.toFixed(2) ?? 'N/A'}-{props.findRecordResponse.originalPriceSuggestion?.toFixed(2) ?? 'N/A'}</p>
                
                <div className='pt-4'>
                    <p>{props.findRecordResponse.summary}</p>
                </div>
                 
                <div className="pt-4 flex flex-wrap justify-center gap-5">
                    {props.findRecordResponse.genres.map((genre, index) => (
                        <span className="badge badge-success gap-2">{genre}</span>
                    ))}
                </div>
            </div>
        </div>
    )
}
