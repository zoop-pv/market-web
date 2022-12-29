/* eslint-disable @next/next/no-img-element */
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import { MouseEventHandler } from "react";
import useSWR from "swr";
import { getMarketplaceTags } from "@/services/tags.service";

type TagProps = {
  icon?: string;
  title?: string;
  name?: string;
  onClick: MouseEventHandler;
};

const Tag = ({ name, icon, onClick }: TagProps) => (
  <div className={styles.tag} onClick={onClick}>
    <img src={icon} alt="logo" />
    <p data-text={name}>{name}</p>
  </div>
);

type TagsSliderProps = {
  selectedTags: string[];
  setSelectedTags: (searchText: string[]) => void;
};

export default function TagSlider({
  selectedTags,
  setSelectedTags,
}: TagsSliderProps) {
  const { data } = useSWR("tags", getMarketplaceTags());
  const router = useRouter();
  const handleTagChange = (id: string) => {
    let searchTags = router.query.tags
      ? Array.isArray(router.query.tags)
        ? router.query.tags
        : [router.query.tags]
      : [];
    if (selectedTags.includes(id)) {
      const index = searchTags.indexOf(id);
      if (index > -1) {
        searchTags.splice(index, 1);
      }
    } else {
      searchTags.push(id);
    }
    if (searchTags.length > 1) {
      setSelectedTags([]);
    } else {
      setSelectedTags(searchTags);
    }
    router.query.tagId = searchTags;
    router.push(router);
  };

  let tagsData = data && data.tags ? data.tags : [];

  return (
    <div className={styles.tagsSlider}>
      {tagsData.map((tag: any) => (
        <Tag
          key={tag._id}
          {...{ ...tag }}
          onClick={() => {
            handleTagChange(tag._id);
          }}
        />
      ))}
    </div>
  );
}
