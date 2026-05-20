import {
  Badge,
  Body1,
  Card,
  CardFooter,
  CardHeader,
  Image,
  Text,
  Title3,
} from "@fluentui/react-components";

import type { GalleryImage } from "../models/GalleryImage";

interface GalleryCardProps {
  image: GalleryImage;
}

export function GalleryCard({ image }: GalleryCardProps) {
  return (
    <Card style={{ overflow: "hidden" }}>
      <Image
        src={`${image.imageUrl}?auto=format&fit=crop&w=900&q=80`}
        alt={image.title}
        fit="cover"
        style={{
          width: "100%",
          height: "220px",
        }}
      />

      <CardHeader
        header={<Title3>{image.title}</Title3>}
        description={<Text>{image.category}</Text>}
      />

      <Body1>{image.description}</Body1>

      <CardFooter>
        {image.featured ? (
          <Badge appearance="filled" color="brand">
            Featured
          </Badge>
        ) : (
          <Badge appearance="outline">Standard</Badge>
        )}
      </CardFooter>
    </Card>
  );
}