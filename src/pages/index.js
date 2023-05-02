import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";

import Layout from "@components/Layout";
import Container from "@components/Container";
import Button from "@components/Button";

import images from "@data/images";

import styles from "@styles/Home.module.scss";

export default function Home() {
    return (
        <Layout>
            <Head>
                <title>My Images</title>
                <meta name="description" content="All of my cool images." />
            </Head>

            <Container>
                <h1 className="sr-only">My Images</h1>

                <h2 className={styles.header}>Images</h2>

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
                                    <h3 className={styles.imageTitle}>
                                        {image.title}
                                    </h3>
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </Container>
        </Layout>
    );
}

export const getStaticProps = async () => {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/image`, {
        headers: {
            Authorization: `Basic ${Buffer.from(process.env.CLOUDINARY_API_KEY + ":" + process.env.CLOUDINARY_API_SECRET).toString("base64")}`
        }
    }).then(r => r.json());
    console.log(response);
    return {
        props: {

        }
    }
}