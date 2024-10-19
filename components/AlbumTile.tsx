'use client'

import { Album } from "@/app/transfer-objects/Album"
import Image from 'next/image';

interface AlbumTileProps {
    album: Album;
  }

export default function AlbumTile({album}: AlbumTileProps) {
    return (
        <div className="w-full h-full rounded-3xl overflow-hidden">
            <Image src={album.thumb} alt={album.title} width={150} height={150}/>
            <div className='ml-4'>
                <p><strong>{album.title}</strong></p>
                <p>Country: {album.country}</p>
                <p>Year: {album.year}</p>
            </div>
        </div>
    )
}
