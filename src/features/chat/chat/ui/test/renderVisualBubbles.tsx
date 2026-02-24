// import { MessageForwarded } from "../messageForwarded";
// import { MessageVisualBubble } from "../messageVisualBubble";

// const renderVisualBubbles = () => {
//   const bubbles: React.ReactNode[] = [];

//   // 1️⃣ forwarded — КАЖДЫЙ В СВОЁМ bubble
//   chatMessage.forwardedMessages.forEach((fwd, i) => {
//     bubbles.push(
//       <MessageVisualBubble key={`fwd-${fwd.uid}`} isMine={isMine} isFirst={i === 0}>
//         <MessageForwarded
//           message={{
//             type: "forwarded",
//             content: fwd.content,
//             authorName: `${fwd.firstName} ${fwd.lastName}`,
//             avatarUrl: fwd.avatarUrl,
//             chatKey: fwd.fromUserId,
//           }}
//         />
//       </MessageVisualBubble>,
//     );
//   });

//   // 2️⃣ основной bubble (текст / медиа / reply)
//   if (chatMessage.content || chatMessage.filesList.length || chatMessage.repliedMessages.length) {
//     bubbles.push(
//       <MessageVisualBubble
//         key="main"
//         isMine={isMine}
//         isFirst={chatMessage.forwardedMessages.length === 0}
//       >
//         <MessageLayout
//           isMine={isMine}
//           message={chatMessage}
//           blocks={buildMainBlocks(chatMessage)}
//           isFirstInGroup={isFirstInGroup}
//         />
//       </MessageVisualBubble>,
//     );
//   }

//   return bubbles;
// };
