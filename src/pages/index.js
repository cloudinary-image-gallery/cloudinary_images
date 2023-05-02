import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";

import Layout from "@components/Layout";
import Container from "@components/Container";
import Button from "@components/Button";
import { mapImgResources, search } from "@lib/cloudinary";
import images from "@data/images";

import styles from "@styles/Home.module.scss";

export default function Home({
    images: defaultImages,
    nextCursor: defaultNextCursor,
}) {
    const [images, setImages] = useState(defaultImages);
    const [nextCursor, setNextCursor] = useState(defaultNextCursor);
    console.log(images, nextCursor);

    const handleLoadMore = async (e) => {
        e.preventDefault();
        const results = await fetch("api/search", {
            method: "POST",
            body: JSON.stringify({
                nextCursor,
            }),
        }).then((r) => r.json());
        const { resources, next_cursor: updatedNextCursor } = results;

        const images = mapImgResources(resources);

        setImages((prev) => {
            return [...prev, ...images];
        });

        setNextCursor(updatedNextCursor);
    };

    return (
        <Layout>
            <Head>
                <title>My Images</title>
                <meta name="description" content="All of my cool images." />
            </Head>

            <Container>
                <h1 className="sr-only">My Images</h1>

                <h2 className={styles.header}>All Images</h2>

                <ul className={styles.images}>
                    {images.map((image) => {
                        return (
                            <li key={image.id}>
                                <a href={image.link} rel="noreferrer">
                                    <div className={styles.imageImage}>
                                        <Image
                                            width={image.width}
                                            height={image.height}
                                            src={image.image}
                                            alt=""
                                        />
                                    </div>
                                </a>
                            </li>
                        );
                    })}
                </ul>
                <p>
                    <Button onClick={handleLoadMore}>Load More Photos</Button>
                </p>
            </Container>
        </Layout>
    );
}

export const getStaticProps = async () => {
    const response = await search();

    const { resources, next_cursor: nextCursor } = response;

    const images = mapImgResources(resources);

    return {
        props: {
            images,
            nextCursor,
        },
    };
};
