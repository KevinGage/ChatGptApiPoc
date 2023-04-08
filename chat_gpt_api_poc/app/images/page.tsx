"use client";

import { useState } from "react";
import Image from "next/image";
import Waiting from "@/components/Waiting";
import Link from "next/link";
import {
  ImageRequestType,
  OneToTenType,
  ImageSizeType,
  ImageResponseType,
} from "@/types/ImageRequestType";

export default function Tokens() {
  const [prompt, setPrompt] = useState<string>("");
  const [n, setN] = useState<OneToTenType>(1);
  const [size, setSize] = useState<ImageSizeType>("1024x1024");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [price, setPrice] = useState<number>(0);

  async function getImages(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const imageRequest: ImageRequestType = {
      prompt: prompt,
      n: n,
      size: size,
    };

    setIsLoading(true);

    const res = await fetch("/api/image", {
      method: "POST",
      body: JSON.stringify(imageRequest),
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const response = (await res.json()) as ImageResponseType;

    const { data } = response;

    setImageUrls(data.map((d) => d.url));

    setIsLoading(false);

    // 1024×1024	$0.020 / image
    // 512×512	$0.018 / image
    // 256×256	$0.016 / image
    let pricePerImage = 0.016;
    if (size === "512x512") {
      pricePerImage = 0.018;
    } else if (size === "1024x1024") {
      pricePerImage = 0.02;
    }

    setPrice((price) => price + pricePerImage * n);

    console.log("data");
    console.log(JSON.stringify(data));
  }

  return (
    <main>
      <div className="px-5">
        <div className="bg-slate-50 text-slate-700 text-lg rounded-md mt-2 mb-5 p-2">
          <h2 className="font-extrabold text-xl mb-2">Settings</h2>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="numberOfImages"
            >
              Number of images to generate from 1 to 10
            </label>
            <select
              className="shadow bg-white border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="numberOfImages"
              name="numberOfImages"
              value={n}
              onChange={(e) => {
                setN(parseInt(e.target.value) as OneToTenType);
              }}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="imageSize"
            >
              Image Size
            </label>
            <select
              className="shadow bg-white border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="imageSize"
              name="imageSize"
              value={size}
              onChange={(e) => {
                setSize(e.target.value as ImageSizeType);
              }}
            >
              <option value="256x256">256x256</option>
              <option value="512x512">512x512</option>
              <option value="1024x1024">1024x1024</option>
            </select>
          </div>
        </div>
      </div>
      <form
        className="bg-slate-50 text-slate-700 text-lg rounded-md m-5 p-2"
        onSubmit={getImages}
      >
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="prompt"
          >
            Prompt
          </label>
          <input
            className="shadow bg-white border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="prompt"
            name="prompt"
            placeholder="Type your image prompt here"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
        {isLoading && <Waiting />}
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg p-2 dark:bg-blue-600 dark:hover:bg-blue-700 my-5"
          type="submit"
        >
          Send
        </button>
      </form>
      <div className="bg-slate-50 text-slate-700 text-lg rounded-md m-5 p-2">
        <h2 className="font-extrabold text-xl mb-2">Total Cost</h2>
        <p>${price}</p>
      </div>
      <div>
        {imageUrls.map((url, i) => (
          <div key={i} className="flex-col m-5">
            <Link
              href={url}
              prefetch={false}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Image
                src={url}
                alt={`Generated image ${i}`}
                width={
                  size === "256x256" ? 256 : size === "512x512" ? 512 : 1024
                }
                height={
                  size === "256x256" ? 256 : size === "512x512" ? 512 : 1024
                }
              />
            </Link>
            <Link
              href={url}
              prefetch={false}
              rel="noopener noreferrer"
              target="_blank"
            >
              {url}
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
