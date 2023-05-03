import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";

import Layout from "@components/Layout";
import Container from "@components/Container";
import Button from "@components/Button";
import { mapImgResources, search, getFolders } from "@lib/cloudinary";

import styles from "@styles/Home.module.scss";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import MainNavigation from "@components/Navigation/MainNavigation";

export default function Home({
    images: defaultImages,
    nextCursor: defaultNextCursor,
    folders,
}) {
    const [images, setImages] = useState(defaultImages);
    const [nextCursor, setNextCursor] = useState(defaultNextCursor);
    const [activeFolder, setActiveFolder] = useState("");

    const handleLoadMore = async (e) => {
        e.preventDefault();
        const results = await fetch("api/search", {
            method: "POST",
            body: JSON.stringify({
                nextCursor,
                expression: `folder="${activeFolder}"`,
            }),
        }).then((r) => r.json());
        const { resources, next_cursor: updatedNextCursor } = results;

        const images = mapImgResources(resources);

        setImages((prev) => {
            return [...prev, ...images];
        });

        setNextCursor(updatedNextCursor);
    };

    const handleOnfolderClick = (e) => {
        const folderPath = e.target.dataset.folderPath;
        if (folderPath == activeFolder) {
            return;
        }
        setActiveFolder(folderPath);
        setNextCursor(undefined);
        setImages([]);
    };

    useEffect(() => {
        (async function run() {
            const results = await fetch("api/search", {
                method: "POST",
                body: JSON.stringify({
                    nextCursor,
                    expression: `folder="${activeFolder}"`,
                }),
            }).then((r) => r.json());
            const { resources, next_cursor: updatedNextCursor } = results;

            const images = mapImgResources(resources);

            setImages((prev) => {
                return [...prev, ...images];
            });

            setNextCursor(updatedNextCursor);
        })();
    }, [activeFolder]);

    return (
        <Layout>
            <Head>
                <title>Noël Fotos</title>
                <meta name="description" content="All of my cool images." />
            </Head>
            <MainNavigation />
            <Container>
                <h1 className="text-center">Albums</h1>

                <ul className={styles.folders} onClick={handleOnfolderClick}>
                    {folders.map((folder) => {
                        return (
                            <li key={folder.path}>
                                <button data-folder-path={folder.path}>
                                    {folder.name}
                                </button>
                            </li>
                        );
                    })}
                </ul>
                <ResponsiveMasonry
                    columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
                >
                    <Masonry gutter="10px">
                        {images.map((image) => {
                            return (
                                <Image
                                    key={image.id}
                                    width={image.width}
                                    height={image.height}
                                    src={image.image}
                                    alt=""
                                />
                            );
                        })}
                    </Masonry>
                </ResponsiveMasonry>
                <p>
                    {nextCursor ? (
                        <Button onClick={handleLoadMore}>
                            Load More Photos
                        </Button>
                    ) : null}
                </p>
            </Container>
        </Layout>
    );
}

export const getStaticProps = async () => {
    const results = await search({
        expression: 'folder=""',
    });

    const { resources, next_cursor: nextCursor } = results;

    const images = mapImgResources(resources);

    const { folders } = await getFolders();

    return {
        props: {
            images,
            nextCursor: nextCursor || false,
            folders,
        },
    };
};
