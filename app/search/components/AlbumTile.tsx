'use client'

import Image from 'next/image';
import { ReleaseData } from '../search-service';
import StarRating from '@/components/StarRating';
import { useCurrency } from '@/app/CurrencyProvider';
import { Currency, currencyOptions } from '@/types/currency';

interface AlbumTileProps {
    findRecordResponse: ReleaseData
    selectedCurrency: Currency
  }

export default function AlbumTile(props: AlbumTileProps) {

    const {rates, loading} = useCurrency(); 

    const convertedLatestPrice : number = (props.findRecordResponse.latestPriceSuggestion * rates[props.selectedCurrency]);
    const convertedOriginalPrice : number = (props.findRecordResponse.originalPriceSuggestion * rates[props.selectedCurrency]);

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
                {currencyOptions[props.selectedCurrency].symbol}{props.findRecordResponse.latestPriceSuggestion
                    ? `${Math.round(convertedLatestPrice)}-${Math.round(convertedOriginalPrice)}`
                    : Math.round(convertedOriginalPrice)}
                </p>

                <StarRating average={props.findRecordResponse.rating.average} count={props.findRecordResponse.rating.count} />

                <div className="flex flex-wrap justify-center gap-5">
                    {props.findRecordResponse.genres.map((genre, index) => (
                        <span className="badge badge-success gap-2" key={index}>{genre}</span>
                    ))}
                </div>
            </div>
        </div>
        <div className="mt-4">
            {/* Album description */}
            <p>{props.findRecordResponse.summary}</p>
        </div></>
    
    )
}
