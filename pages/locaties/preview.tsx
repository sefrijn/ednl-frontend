import client from "@/apollo-client";
import { gql } from "@apollo/client";
import { getAddresses } from "@/lib/getAddressesFromAPI";
import { Organisation } from "@/types/organisation";
import { Address } from "@/types/address";
import { useEffect, useState } from "react";
import Lottie from "react-lottie";
import loading from "@/public/dancing.json";
import Locatie from "@/pages/locaties/[locatie]";
import { useRouter } from "next/router";

async function getDynamicProps(slug: string) {
  //    Get data from WordPress
  const { data } = await client.query({
    query: gql`
      query{
         organisatieAfbeeldingen {
          organisatieAfbeeldingen {
            afbeeldingen {
              id
              sourceUrl(size: LARGE)
            }
          }
        }
        organisation(id: "${slug}", idType: SLUG) {
          id
          title
          content
          featuredImage {
            node {
              sourceUrl
            }
          }
          slug
          acfOrganisatieGegevens {
            email
            website
            locaties {
              naam
              adres
              over
            }
          }
        }
      }
    `,
  });

  //   Get addresses and long lat coordinates from external GEO API
  // const addresses = await getCachedAddresses();
  const addresses = await getAddresses(
    [data.organisation],
    process.env.NODE_ENV === "development" ? false : true
  );
  return {
    organisation: data.organisation,
    addresses: addresses,
    defaultImages:
      data.organisatieAfbeeldingen.organisatieAfbeeldingen.afbeeldingen,
  };
}

type AppProps = {
  organisation: Organisation;
  addresses: { [key: string]: Address };
  defaultImages: any;
};

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loading,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export default function Preview() {
  const [data, setData] = useState<AppProps>();
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    getDynamicProps("" + slug).then((data) => {
      setData(data);
    });
  }, []);

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  if (data) {
    return (
      <Locatie
        organisation={data.organisation}
        addresses={data.addresses}
        defaultImages={data.defaultImages}
      />
    );
  }
  return (
    <div
      className={
        "-mt-24 h-screen cursor-default pointer-events-none flex flex-col items-center justify-center"
      }
    >
      <div className={"w-48"}>
        <Lottie isClickToPauseDisabled={true} options={defaultOptions} />
      </div>
      <p>Pagina wordt geladen... Doe een dansje</p>
    </div>
  );
}
