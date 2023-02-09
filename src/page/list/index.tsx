import {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from "react";
import styles from "./index.module.scss"
import {flushSync} from "react-dom";

export const List: FC = () => {
  // 容器的高度
  const [containerHeight,setContainerHeight] = useState(600)
  // 列表项的高度
  const [itemHeight,setItemHeight] = useState(50)

  // 实际的滚动高度
  const [realHeight,setRealHeight] = useState(0)

  const startOffset = useRef(0)

  // 一列显示多少个
  const [num,setNum] = useState<number>(0)

  const lastIndex = useRef(0);
  const nextIndex = useRef(0);
  // 列表数据
  const data = useRef<number[]>([])


  const [newData,setNewData] = useState<number[]>([])




  const onWheel = useCallback((event:WheelEvent) => {
    const scrollTop = event?.currentTarget?.scrollTop;
    startOffset.current = scrollTop  - (scrollTop % itemHeight);
    console.log(scrollTop)
    const last = Math.floor(scrollTop/itemHeight)
    lastIndex.current = last
    nextIndex.current = last + num
    setNewData(data.current.slice(lastIndex.current,nextIndex.current))
  },[lastIndex,nextIndex,data,num])


  useEffect(() => {
    const arr = new Array(10000).fill(1).map((_,i)=> i);
    data.current = arr
  },[])


  useEffect(() => {
    setRealHeight(data.current.length * itemHeight);
  },[itemHeight,data])

  useEffect(() => {
    const n = Math.ceil(containerHeight/itemHeight)
    setNum(n);
    nextIndex.current = n;
  },[containerHeight,itemHeight])

  useEffect(() => {
    setNewData(data.current.slice(lastIndex.current,nextIndex.current))
  },[lastIndex.current,nextIndex.current,data.current])


  return <div className={styles.container} style={{height:containerHeight+'px' }} onScroll={(e) => {
    onWheel(e);
  }
  }>
    <div className={styles.scrollBox} style={{height:realHeight+'px' }} >
      <div style={{transform: `translate3d(0,${startOffset.current}px,0)`}}>
        {newData.map((v) => {
          return (<div key={v} style={{height:itemHeight+'px'}}>{v}</div>)
        })}
      </div>

    </div>
  </div>
}
