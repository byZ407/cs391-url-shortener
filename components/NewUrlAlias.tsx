"use client";

import createNewAlias from "@/lib/createNewAlias";
import { Button, FormHelperText, TextField } from "@mui/material";
import { useState } from "react";

export default function NewUrlAlias() {
    const [url, setUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [error, setError] = useState("");
    const [shortUrl, setShortUrl] = useState("");

    async function handleSubmit() {
        setError("");
        setShortUrl("");

        const res = await createNewAlias(url, alias);

        if (typeof res === "string") {
            setError(res);
            return;
        }
        if (res === null) {
            setError("Failed to generate. Please try again later.");
            return;
        }

        setShortUrl(res.shortUrl);
        setUrl("");
        setAlias("");
    }

    return (
        <form
            className="w-96 rounded-xl p-4 bg-sky-400 flex flex-col gap-5"
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}
        >
            <TextField
                variant="filled"
                label="Original URL"
                placeholder="https://example.com/very/long/url"
                sx={{ backgroundColor: "white", width: "100%" }}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />

            <TextField
                variant="filled"
                label="Custom Alias"
                placeholder="your-custom-alias"
                sx={{ backgroundColor: "white", width: "100%" }}
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
            />

            {error &&
                <FormHelperText error>{error}</FormHelperText>
            }

            <div className="flex justify-center">
                <Button type="submit" variant="contained" sx={{ width: "100px" }} disabled={!url || !alias}>
                    Generate
                </Button>
            </div>

            {shortUrl &&
                <div className="p-2 bg-white text-blue-700 break-words">
                    Shortened URL: <a href={shortUrl} target="_blank" className="underline">{shortUrl}</a>
                </div>
            }
        </form>
    );
}
