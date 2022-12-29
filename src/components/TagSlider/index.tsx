/* eslint-disable @next/next/no-img-element */
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import { MouseEventHandler } from "react";
import useSWR from "swr";
import { getMarketplaceTags } from "@/services/tags.service";

type TagProps = {
  icon?: string;
  title?: string;
  _id: string;
  slug: string;
  selectedTags: string[];
  name?: string;
  onClick: MouseEventHandler;
};

type ITag = {
  icon: string;
  name: string;
  _id: string;
  slug: string;
};

const Tag = ({ slug, name, icon, onClick, selectedTags }: TagProps) => (
  <div
    className={`${styles.tag} ${selectedTags.includes(slug) && styles.active}`}
    onClick={onClick}
  >
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
  const handleTagChange = (slug: string) => {
    let searchTags = router.query["tagsSlugs[]"]
      ? Array.isArray(router.query["tagsSlugs[]"])
        ? router.query["tagsSlugs[]"]
        : [router.query["tagsSlugs[]"]]
      : [];
    if (slug) {
      if (selectedTags.includes(slug)) {
        const index = searchTags.indexOf(slug);
        if (index > -1) {
          searchTags.splice(index, 1);
        }
      } else {
        searchTags.push(slug);
      }
    }
    setSelectedTags(searchTags);
    router.query["tagsSlugs[]"] = searchTags;
    router.push(router);
  };

  let tagsData = data && data.tags ? data.tags : [];
  return (
    <div className={styles.tagsSlider}>
      {tagsData.map((tag: ITag) => (
        <Tag
          key={tag._id}
          {...{ ...tag, selectedTags }}
          onClick={() => {
            handleTagChange(tag.slug);
          }}
        />
      ))}
    </div>
  );
}
