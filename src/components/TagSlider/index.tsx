/* eslint-disable @next/next/no-img-element */
import styles from "./styles.module.scss";
import { useRouter } from 'next/router';
import { MouseEventHandler } from "react";
type TagProps = {
  icon?: string,
  title?: string,
  name?:string,
  onClick:MouseEventHandler
};

const Tag = ({ name,icon,onClick}: TagProps) => <div className={styles.tag} onClick={onClick}>
    <img src={icon} alt="logo"/>
  <p data-text={name}>{name}</p>
</div>;

export default function TagSlider(options:any) {
  const router = useRouter();
  const handleTagChange = (id:string)=>{
    let searchTags = router.query.tags ? Array.isArray(router.query.tags) ? router.query.tags : [router.query.tags] : [];
    searchTags.push(id);
    if(typeof options.searchTagsState =="function"){
      options.searchTagsState(searchTags);
    }
    router.query.tags = searchTags;
    router.push(router);
  };
  let tagsData = options.tagsData ? options.tagsData : []
  return (
    <div className={styles.tagsSlider}>
      {tagsData.map((tag:any) => <Tag key={tag._id} {...{...tag}} onClick={()=>{handleTagChange(tag._id);}}/>)}
    </div>
  )
}
