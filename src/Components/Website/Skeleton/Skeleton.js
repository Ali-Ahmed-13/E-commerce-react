import Skeleton from "react-loading-skeleton";

export default function CleanSkeleton(props) {
  let data = [];
  for (let i = 0; i < props.count; i++) {
    data.push(
      <div
        className={`col-lg-${props.lg} col-md-${props.md} col-${props.sm} ${props.classes}`}
        key={i}
      >
        <div className={`${props.mx && "mx-1"}`}>
          <Skeleton
            baseColor={props.baseColor ? props.baseColor : "#ebebeb"}
            height={`${props.height}px`}
          />
        </div>
      </div>
    );
  }
  return data;
}
