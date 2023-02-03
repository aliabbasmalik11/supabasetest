import React, { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "../utils/database.types";
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

export default function Avatar({
  uid,
  url,
  onUpload,
}: {
  uid: string;
  url: Profiles["avatar_url"];
  size: number;
  onUpload: any;
}) {
  const supabase = useSupabaseClient<Database>();
  const [avatarUrl, setAvatarUrl] = useState<any>("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      console.log("Error downloading image: ", error);
    }
  }

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${uid}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      console.log(error);
      alert("Error uploading avatar!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mt-6 flex-grow lg:mt-0 lg:ml-6 lg:flex-shrink-0 lg:flex-grow-0">
      <p className="text-sm font-medium text-gray-700" aria-hidden="true">
        Photo
      </p>
      <div className="mt-1 lg:hidden">
        <div className="flex items-center">
          <div
            className="inline-block h-12 w-12 flex-shrink-0 overflow-hidden rounded-full"
            aria-hidden="true"
          >
            <img
              className="h-full w-full rounded-full"
              src={avatarUrl}
              alt=""
            />
          </div>
          <div className="ml-5 rounded-md shadow-sm">
            <div className="group relative flex items-center justify-center rounded-md border border-gray-300 py-2 px-3 focus-within:ring-2 focus-within:ring-sky-500 focus-within:ring-offset-2 hover:bg-gray-50">
              <label
                htmlFor="mobile-user-photo"
                className="pointer-events-none relative text-sm font-medium leading-4 text-gray-700"
              >
                <span>Change</span>
                <span className="sr-only"> user photo</span>
              </label>
              <input
                id="mobile-user-photo"
                name="user-photo"
                type="file"
                className="absolute h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="relative hidden overflow-hidden rounded-full lg:block">
        <img
          className="relative h-40 w-40 rounded-full"
          src={avatarUrl}
          alt=""
        />
        <label
          htmlFor="desktop-user-photo"
          className="absolute inset-0 flex h-full w-full items-center justify-center bg-black bg-opacity-75 text-sm font-medium text-white opacity-0 focus-within:opacity-100 hover:opacity-100"
        >
          <span>Change</span>
          <span className="sr-only"> user photo</span>
          <input
            name="user-photo"
            className="absolute inset-0 h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0"
            type="file"
            id="single"
            accept="image/*"
            onChange={uploadAvatar}
            disabled={uploading}
          />
        </label>
      </div>
    </div>
  );
}
