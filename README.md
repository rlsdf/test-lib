# web-timeline-editor

<a href="https://npm.linecorp.com/-/package/@linecorp/web-timeline-editor"><img src="https://npm.linecorp.com/-/badge/@linecorp/web-timeline-editor.svg"></a>

## Components

### Post Writer
<details>
  <summary>Example And Interface</summary>

```tsx
import { PostWriter as WteWriterContainer } from '@linecorp/web-timeline-editor';
import '@linecorp/web-timeline-editor/dist/css/web-timeline-editor.css';

const Template = () => {
  const postWriterProps = {
    contents: {}, // TL-BE Data (for Post Writer)
    additionalContents: {}, // TL-BE Data (for Post Writer)
    config: {
      domain: {
        sticon: { // sticon에서 사용할 Domain 정보 (for BETA only)
          v1: 'https://scdn-shop.line-apps-beta.com',
          v2: 'https://stickershop-beta.line-scdn.net',
        },
        obs: {
          default: 'https://obs-beta.line-scdn.net',
          upload: 'https://obs.line-beta.me:443',
        },
        sticker: 'https://dl.stickershop.line.beta.naver.jp',
        lineShop: 'https://store.line-beta.me',
      },
      language: '',
    },
    toolGroupVisible={{
      image: true,
      video: true,
      sticker: true,
      textCard: true,
    }}
    notification(message) => {
      // Noti 메세지를 노출할 수 있는 함수 전달.
      alert(message);
    },
    notificationType: 'message', // 'message' or undefined: notification을 xlt까지 적용된 string으로 받음. 'key': 임의의 key로 전달되고 사용처에서 해당 key에 맞는 notification message를 선택하여 표현 가능.
    fetchRecallList: () => {};
    fetchStickerList: () => {};
    // VS용 stickerPicker 사용 시 fetchStickerVSItems 콜백 사용.
    fetchStickerVSItems: () => Promise<IUpdateStickerVSItemsPayload> | IUpdateStickerVSItemsPayload;
    fetchOneTimeToken: () => {};
    // media 업로드 시 multiTimeToken을 이용한다면 fetchMultiTimeToken 콜백 사용.
    fetchMultiTimeToken: () => Promise<{ obsAuthToken: string } | null | undefined>;
    fetchPageInfo: () => {};
    onError(message) => {
      // Error 메세지 노출 (미개발)
      myAppErrorMessage(message);
    },
    onChangeMedia: (data) => {
      // 미디어에 변동이 발생한 경우 (미개발)
      // ViewType 변경시: Grid or Slide
      // media 추가/삭제
      // Grid View에서 순서가 변경된 경우
      // Slide View에서 보여지는 화면이 변경될 경우
    },
    onClickAddPhotoButton: (data) => {
      // 툴바에서 이미지 추가 버튼을 누른 경우
    },
    onClickAddVideoButton: (data) => {
      // 툴바에서 비디오 추가 버튼을 누른 경우
    },
    onClickAddStickerButton: (data) => {
      // 툴바에서 스티커 추가 버튼을 누른 경우
    },
    onClickTextCardButton: (data) => {
      // 툴바에서 텍스트 카드 버튼을 누른 경우
    },
    onIsDirty: (isDirty) => {
      // Content에 변화가 발생한경우 실행.
    },
  }

  const writerRef = useRef();

  const isDirty = () => {
    // Writer에 입력된 Data에 수정이 있었는지 확인.
    const isDirty = writerRef.current?.isDirty();
  }


  const onSubmit = () => {
    // Writer에 입력된 Data 획득.
    const data = writerRef.current?.getData();
  }

  const onMouseUp = () => {
    const data = writerRef.current?.getData();
      // Grid 편집시 Writer의 범위 밖에서 mouseUp이 발생했을 경우 moveEnd 이벤트 trigger하여 media 편집 cancel 수행.
    if (data?.contents.media?.length && data?.contents.contentsStyle?.mediaStyle !== 'SLIDE') {
      writerRef.current?.moveEnd();
    }
  };

  const hideStickerPanel = () => {
   writerRef.current?.hideStickerPanel();
  }

  return (
    <PostWriter {...postWriterProps} ref={writerRef} />
  )
}
```

</details>

### Comment Writer
<details>
  <summary>Example And Interface</summary>

```tsx
import { CommentEditor } from 'web-timeline-editor';

  const commentEditorProps = {
    config: { // 필요한 config 정보.
      domain: {
        sticon: {},
        obs: {},
      },
    },
    uploadableImage: boolean, // 답글 쓰기에서 image 업로드를 사용하지 않는다면 false, 기본값은 true.
    recall: {}, // 답글 쓰기 버튼을 누른 경우 해당되는 userInfo 전달
    onNotification(message) => {
      // Noti 메세지 노출
      myAppNotiMessage(message);
    },
    onError(message) => {
      // Error 메세지 노출
      myAppErrorMessage(message);
    },
    onClickAddPhotoButton: (data) => {
      // 툴바에서 이미지 추가 버튼을 누른 경우
    },,
    onClickAddStickerButton: (data) => {
      // 툴바에서 스티커 추가 버튼을 누른 경우
    },
    onSubmit: (data) => {
      // 전송 버튼을 눌렀을 경우
    },
  }

  return <CommentEditor {...commentEditorProps}>
}
```
</details>

### Post Viewer Interface

<details>
  <summary>Example And Interface</summary>

```tsx
import { PostViewer } from 'web-timeline-editor'

const Template = () => {
  const postViewerProps = {
    onUpdateRef: () => {
      // post viewer redux state 내용이 변경 되었을 때 감지
      // 외부에서 map 형태로 ref.current 를 저장하여 사용 할 경우 current update 를 위한 용도
    },
    contents: {}, // TL-BE Data (for Edit Post)
    additionalContents: {}, // TL-BE Data (for Edit Post)
    config: { // 필요한 config 정보.
      domain: {
        sticon: { // sticon에서 사용할 Domain 정보 (for BETA only)
          v1: 'https://scdn-shop.line-apps-beta.com',
          v2: 'https://stickershop-beta.line-scdn.net',
        },
        obs: {
          default: 'https://obs-beta.line-scdn.net',
        },
        music: {
          taiwan: 'https://music-tw.line-beta.me/',
        }
      },
      // obs Domain 정보 (for BETA only)
      obs: 'https://obs-beta.line-scdn.net',
      language: '',
      uvp: {
        useCss: false
      }
    },
    uiOptions: {
      text: {
        ellipsis: false, // default: true - text 영역 줄임 기능
        ellipsisLine: 0, // default: contents 요소에 따라 달라짐 (외부 요소에 따라 달라질 경우 사용)
      },
      media: {
        hideMediaViewerIcon: false, // default: false - media viewer 아이콘 노출
        lazyLoadMedia: false, // default: false - true 시 initContents 로 lazyLoad 타이밍 전달
        isPreviewOfWriter: false, // true 시 post 작성 페이지에서 보여지는 preview 로 동작하게 됨 / optional
      },
      video: {
        checkEncode: false, // default: false - encode 체크 기능 true 로 설정할 경우 fetchEncodeStatus 필수
        fetchEncodeStatus: async (resourceId) => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                encodeStatus: 'succ',
                encodedHeight: 540,
                encodedWidth: 960,
              });
            }, 2000);
          });
        }, // encode check API
      },
      extVideo: {
        fetchPlayInfo: async (resourceId) => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(playInfo: IPlayInfo);
            }, 2000);
          });
        }, // get Playinfo API
        fetchLineTvPlayInfo: async (resourceId) => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(lineTvPlayInfo: ILineTvPlayInfo);
            }, 2000);
          });
        }, // get LINE TV Playinfo API
      }
    },
    events: {
      image: {
        onClick(mediaList: IMedia[], index: number) => {
          // Media - Image type 을 click
          // mediaList : click 한 image 를 포함한 mediaList
          // index: click 한 image number
        },
      },
      video: {
        onClick(mediaList: IMedia[], index: number) => {
          // Media - 재생을 지원하지 않는 Video type 을 click
        },
        onClickPlay(mediaList: IMedia[], index: number, customEvent: Event | CustomEvent) => {
          // Media - Video type 의 play 버튼 click
        },
        onClickPause(mediaList: IMedia[], index: number, customEvent: Event | CustomEvent) => {
          // Media - Video type 의 pause 버튼 click
        },
        onClickMute(mediaList: IMedia[], index: number, customEvent: Event | CustomEvent) => {
          // Media - Video type 의 음소거 버튼 click
        },
        onClickFullScreen(mediaList: IMedia[], index: number, customEvent: Event | CustomEvent) => {
          // Media - Video type 의 전체화면 버튼 click
        },
        onClickSeekbar(mediaList: IMedia[], index: number, customEvent: Event | CustomEvent) => {
          // Media - Video type 의 time line seek bar click
        },
        onEncodingError(mediaList: IMedia[], index: number, customEvent: Event | CustomEvent) => {
          // Media - Video type 의 encoding 검사 중 error 발생
        },
        onEnded(mediaList: IMedia[], index: number, customEvent: Event | CustomEvent) => {
          // Media - 재생중인 Video 가 play time 마지막에 도달
        },
        onVisibilityChanged(mediaList: IMedia[], index: number, customEvent: Event | CustomEvent) => {
          // Media - Video 의 노출 값이 변경 될 경우
        },
      },
      text: {
        onClickHashTag(hashtag: string) => {
          // Text - hash tag 를 click
        },
        onClickRecall(mid: string) => {
          // Text - mention(호출) 을 click
        },
      },
      location: {
        onClickPreview(data) => {
          // Location preview - preview 영역을 click
        },
        onClickText(data) => {
          // Location test - text link 영역을 click
        },
      },
      sticker: {
        onClick(id: string, event: React.MouseEvent<HTMLDivElement>, sticker: ICustomSticker) => {
          // Sticker - sticker 를 click
        },
      },
      link: {
        onClick(url: string) => {
          // Link preview - preview 영역을 click
        },
      },
      onError(message) => {
        // Error 메세지 노출
        myAppErrorMessage(message);
      },
    },
  }

  const viewerRef = useRef();

  const activateContents = () => {
    // contents 의 type에 따라 활성화
    viewerRef.current.activateContents();
  }

  const deactivateContents = () => {
    // contents 의 type에 따라 활성화
    viewerRef.current.deactivateContents();
  }

  const playVideo = () => {
    // Media - Video 를 재생
    viewerRef.current.video.play();
  }

  const pauseVideo = () => {
    // Media - Video 의 재생을 멈춤
    viewerRef.current.video.play();
  }

  return <PostViewer {...postViewerProps} ref={viewerRef} />
}
```
</details>

### Sticker Card

<details>
  <summary>Example And Interface</summary>

#### 기본 기능
- Click Event
  1. Animation Sticker인 경우 Sticker Paly
  2. 스티커 클릭시 해당 Sticker Shop으로 이동
      - Sticon이거나, 재생중인 Animation Sticker 이동하지 않음.

#### Props
|Name|Type|Description|Required|
|------|---|---|---|
|`sticker`|`ISticker`|Sticker 정보|O|
|`domain`|`Object`|Sticker Resource Serving Domain|O|
|`backgroundColor`|`String`|BackgroundColor 값|X|
|`ignoreDefaultClickEvent`|`Boolean`|기본 Click Event 제한|X|

```tsx
import { Sticker as StickerCard } from '@linecorp/web-timeline-editor';
import '@linecorp/web-timeline-editor/dist/css/web-timeline-editor.css';

const Temp = () => {

  return <StickerCard
    backgroundColor={backgroundColor}
    stickers={stickers}
    domain={{
      sticker: 'https://dl.stickershop.line.beta.naver.jp',
      lineShop: 'https://store.line-beta.me',
    }}
    ignoreDefaultClickEvent={ignoreDefaultClickEvent}
  />
}

export default Temp;
```

</details>

### Comment Viewer Interface

<details>
  <summary>Example And Interface</summary>

```tsx
import { CommentViewer } from 'web-timeline-editor'

const commentViewerProps = {
  config: { // 필요한 config 정보.
    domain: {
      sticon: { // sticon에서 사용할 Domain 정보 (for BETA only)
        v1: 'https://scdn-shop.line-apps-beta.com',
        v2: 'https://stickershop-beta.line-scdn.net',
      },
      obs: {
        default: 'https://obs-beta.line-scdn.net',
      },
      sticker: 'https://dl.stickershop.line.beta.naver.jp',
    },
    language: '',
  },
  events: {
    image: {
      onClick(extDataList: IExtData[], index: number) => {
        // Comment image 를 click
        // extDataList : click 한 image 를 포함한 extDataList
        // index: click 한 image number
      },
    },
    sticker: {
      onClick(event: React.MouseEvent<HTMLDivElement>, sticker: ICustomSticker) => {
        // Comment sticker 를 click
      },
    },
    text: {
      onClickHashTag(hashtag: string) => {
        // Text - hash tag 를 click
      },
      onClickRecall(mid: string) => {
        // Text - mention(호출) 을 click
      },
    },
  },
  recallInfos: [],
  commentId: '',
  commentText: '',
  contentsList: [],
}

const Temp = () => {
  return <CommentViewer {...commentViewerProps} />
}

export default Temp;

```
</details>

## Utils

### convertTextContent

<details>
  <summary>Example And Interface</summary>

```tsx
import { convertTextContent } from '@linecorp/web-timeline-editor';

const Temp = () => {
  const convertText = convertTextContent({
    text: '',
    textMeta: [],
    sticonMetas: [],
  })

  return <div dangerouslySetInnerHTML={{ __html: convertText }} />
}

export default Temp;
```

</details>

## Develop

### Gitmoji
- 커밋의 목적이나 의도를 쉽게 구별하기 위해 커밋 메세지에 활용함.

|아이콘|코드|내용|
|------|---|---|
|🚨|`:rotating_light:`|QA 버그 수정|
|📝|`:memo:`|문서 추가 / 수정|
|🌱|`:seedling:`|새 기능 추가|
|🔧|`:wrench:`|기능 수정, 설정, 리펙토링, 코드 수정, 파일 삭제 등|

- https://gitmoji.dev/
- https://treasurebear.tistory.com/70
- https://marketplace.visualstudio.com/items?itemName=Vtrois.gitmoji-vscode
