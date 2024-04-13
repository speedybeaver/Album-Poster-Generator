"use client";
import Image from "next/image";
import UseFetch from "./hooks/UseFetch";
import { useState } from "react";
import { Console } from "console";
import UseAlbum from "./hooks/UseAlbum";

export default function Home() {
  const [id, setid] = useState("2ODvWsOgouMbaA5xf0RkJe");
  var { data, loading, error } = UseAlbum(id);

  function handleChange(event: any) {
    setid(event.target.value);
  }

  return (
    <div className="main p-8 bg-blue-500 flex space-x-8 text-black">
      <div className="poster max-w-3xl bg-beige border-8 border-white min-h-96 py-4 px-16 justify-center grid">
        <img
          className="border-4 border-black w-full"
          src={data?.images[1].url}
        />

        <br />

        <div className="flex space-x-4">
          <div className="text-4xl tracking-tighter font-bold">
            {data?.name}
          </div>
          <div className="text-xl">{data?.release_date.substring(0, 4)}</div>
        </div>

        <div className="flex space-x-4">
          <div className="font-bold text-xl">{data?.artists[0].name}</div>
          <div className="text-xl">{data?.name}</div>
        </div>

        <br />

        <ol className="text-xl" type="1">
          {data?.tracks.items.map((track: any, index: any) => {
            return (
              <div key={track.name} className="">
                {index + 1}. {track.name}
              </div>
            );
          })}
        </ol>
      </div>

      <div className="flex flex-col space-y-4">
        <input
          onInput={handleChange}
          type="text"
          placeholder="Album name"
          className="text-white input input-bordered w-full max-w-xs"
        />
        <button
          className="btn generate"
          onClick={() => {
            console.log(data);
          }}
        >
          Generate
        </button>
        <button className="btn download">Download</button>
      <h1></h1>
      </div>
    </div>
  );
}
