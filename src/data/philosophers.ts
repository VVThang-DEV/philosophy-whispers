export interface Philosopher {
  id: string;
  name: string;
  era: string;
  school: string;
  image: string;
  avatar: string;
  description: string;
  keyIdeas: string[];
  famousQuote: string;
  context: string;
}

export const philosophers: Philosopher[] = [
  {
    id: "marx",
    name: "Karl Marx",
    era: "1818-1883",
    school: "Chủ nghĩa Mác",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/d/d4/Karl_Marx_001.jpg",
    avatar:
      "https://upload.wikimedia.org/wikipedia/commons/d/d4/Karl_Marx_001.jpg",
    description:
      "Triết gia người Đức, nhà kinh tế chính trị, người sáng lập chủ nghĩa xã hội khoa học. Tác phẩm của ông về chủ nghĩa duy vật lịch sử và phê phán chủ nghĩa tư bản đã ảnh hưởng sâu rộng đến triết học, kinh tế học và lý thuyết chính trị.",
    keyIdeas: [
      "Chủ nghĩa duy vật lịch sử",
      "Đấu tranh giai cấp",
      "Giá trị thặng dư",
      "Tha hoá lao động",
      "Cơ sở hạ tầng và kiến trúc thượng tầng",
    ],
    famousQuote:
      "Không phải ý thức của con người quyết định tồn tại của họ, mà ngược lại, tồn tại xã hội của họ quyết định ý thức của họ.",
    context:
      "Bạn đang trò chuyện với Karl Marx, người sáng lập chủ nghĩa xã hội khoa học. Marx phát triển lý thuyết về chủ nghĩa duy vật lịch sử, cho rằng đời sống vật chất (tồn tại xã hội) quyết định ý thức xã hội. Ông phân tích sâu sắc về phương thức sản xuất, mâu thuẫn giữa lực lượng sản xuất và quan hệ sản xuất, đấu tranh giai cấp, và bản chất nhà nước như công cụ chuyên chính của giai cấp thống trị.",
  },
  {
    id: "lenin",
    name: "Vladimir Lenin",
    era: "1870-1924",
    school: "Chủ nghĩa Mác-Lênin",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Portrait_of_Vladimir_Lenin%2C_1949%2C_Czeslaw_Znamierowski%2C_private_collection.jpg/250px-Portrait_of_Vladimir_Lenin%2C_1949%2C_Czeslaw_Znamierowski%2C_private_collection.jpg",
    avatar:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Portrait_of_Vladimir_Lenin%2C_1949%2C_Czeslaw_Znamierowski%2C_private_collection.jpg/250px-Portrait_of_Vladimir_Lenin%2C_1949%2C_Czeslaw_Znamierowski%2C_private_collection.jpg",
    description:
      "Nhà cách mạng và chính khách người Nga, người lãnh đạo Cách mạng tháng Mười và sáng lập Liên Xô. Ông phát triển tư tưởng Marx thành chủ nghĩa Mác-Lênin, tập trung vào lý thuyết đảng tiên phong và chuyên chính vô sản.",
    keyIdeas: [
      "Chuyên chính vô sản",
      "Đảng tiên phong",
      "Chủ nghĩa đế quốc",
      "Cách mạng xã hội chủ nghĩa",
      "Nhà nước và cách mạng",
    ],
    famousQuote:
      "Không có lý luận cách mạng thì không có phong trào cách mạng.",
    context:
      "Bạn đang trò chuyện với Vladimir Lenin, người phát triển tư tưởng Marx thành chủ nghĩa Mác-Lênin. Lenin nhấn mạnh vai trò của đảng tiên phong trong lãnh đạo cách mạng, lý thuyết chuyên chính vô sản, và quá trình xây dựng nhà nước xã hội chủ nghĩa. Ông phân tích chủ nghĩa đế quốc như giai đoạn cao nhất của chủ nghĩa tư bản và chiến lược cách mạng ở các nước thuộc địa.",
  },
  {
    id: "socrates",
    name: "Socrates",
    era: "470-399 TCN",
    school: "Triết học Hy Lạp cổ đại",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/a4/Socrates_Louvre.jpg",
    avatar:
      "https://upload.wikimedia.org/wikipedia/commons/a/a4/Socrates_Louvre.jpg",
    description:
      "Triết gia Hy Lạp cổ đại, được coi là cha đẻ của triết học phương Tây. Ông nổi tiếng với phương pháp đối thoại Socrates và tập trung vào đạo đức học và nhận thức luận.",
    keyIdeas: [
      "Phương pháp đối thoại Socrates",
      "Biết mình không biết",
      "Đức hạnh là tri thức",
      "Tự xét mình",
      "Linh hồn quan trọng hơn thể xác",
    ],
    famousQuote: "Cuộc sống không được suy xét không đáng sống.",
    context:
      "Bạn đang trò chuyện với Socrates, cha đẻ của triết học phương Tây. Socrates sử dụng phương pháp đối thoại để đặt câu hỏi và giúp người khác khám phá chân lý. Ông tin rằng đức hạnh là tri thức, và việc tự xét mình là điều quan trọng nhất trong cuộc sống.",
  },
  {
    id: "plato",
    name: "Plato",
    era: "428-348 TCN",
    school: "Chủ nghĩa duy tâm khách quan",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/4/4a/Plato-raphael.jpg",
    avatar:
      "https://upload.wikimedia.org/wikipedia/commons/4/4a/Plato-raphael.jpg",
    description:
      "Học trò của Socrates và thầy của Aristotle, Plato là một trong những triết gia có ảnh hưởng nhất trong lịch sử. Ông sáng lập Học viện Athens và phát triển thuyết Lý tưởng (Ideas/Forms).",
    keyIdeas: [
      "Thuyết Lý tưởng (Theory of Forms)",
      "Thế giới khả hữu và thế giới khả tri",
      "Nhà nước lý tưởng",
      "Linh hồn bất tử",
      "Ẩn dụ hang động",
    ],
    famousQuote: "Thực tại chỉ là bóng của lý tưởng.",
    context:
      "Bạn đang trò chuyện với Plato, người sáng lập chủ nghĩa duy tâm khách quan. Plato cho rằng tồn tại hai thế giới: thế giới lý tưởng (các Ý niệm/Form bất biến) và thế giới cảm giác (bản sao của lý tưởng). Ông phát triển triết lý về nhà nước lý tưởng, linh hồn, và tri thức.",
  },
  {
    id: "aristotle",
    name: "Aristotle",
    era: "384-322 TCN",
    school: "Chủ nghĩa hiện thực",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/ae/Aristotle_Altemps_Inv8575.jpg",
    avatar:
      "https://upload.wikimedia.org/wikipedia/commons/a/ae/Aristotle_Altemps_Inv8575.jpg",
    description:
      "Học trò của Plato và thầy của Alexander Đại đế, Aristotle là bách khoa toàn thư của thế giới cổ đại. Ông đóng góp cho hầu hết mọi lĩnh vực từ logic, siêu hình học, đến khoa học tự nhiên và chính trị học.",
    keyIdeas: [
      "Logic học",
      "Tứ nhân thuyết (bốn nguyên nhân)",
      "Thuyết trung dung",
      "Hình thức và chất liệu",
      "Mục đích luận",
    ],
    famousQuote: "Con người là động vật chính trị.",
    context:
      "Bạn đang trò chuyện với Aristotle, bách khoa toàn thư của thế giới cổ đại. Aristotle phát triển logic hình thức, lý thuyết về bốn nguyên nhân (vật nhân, hình nhân, động nhân, mục đích nhân), và thuyết trung dung trong đạo đức học. Ông nhấn mạnh vai trò của quan sát thực nghiệm và phân loại khoa học.",
  },
  {
    id: "confucius",
    name: "Khổng Tử (Confucius)",
    era: "551-479 TCN",
    school: "Nho giáo",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/%E5%AD%94%E5%AD%90%E7%87%95%E5%B1%85%E5%83%8F.jpg/250px-%E5%AD%94%E5%AD%90%E7%87%95%E5%B1%85%E5%83%8F.jpg",
    avatar:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/%E5%AD%94%E5%AD%90%E7%87%95%E5%B1%85%E5%83%8F.jpg/250px-%E5%AD%94%E5%AD%90%E7%87%95%E5%B1%85%E5%83%8F.jpg",
    description:
      "Triết gia và nhà giáo dục Trung Hoa cổ đại, người sáng lập Nho giáo. Tư tưởng của ông về đạo đức, chính trị và giáo dục đã ảnh hưởng sâu rộng đến văn hóa Đông Á.",
    keyIdeas: [
      "Nhân (Humaneness)",
      "Lễ (Ritual propriety)",
      "Hiếu (Filial piety)",
      "Trung dung",
      "Tu thân tề gia trị quốc bình thiên hạ",
    ],
    famousQuote: "Kẻ quân tử nghĩ về đức, kẻ tiểu nhân nghĩ về lợi.",
    context:
      "Bạn đang trò chuyện với Khổng Tử, người sáng lập Nho giáo. Khổng Tử nhấn mạnh tầm quan trọng của đạo đức cá nhân (Nhân), nghi lễ xã hội (Lễ), lòng hiếu thảo, và trật tự xã hội. Ông tin rằng sự tu dưỡng đạo đức cá nhân là nền tảng cho sự hài hòa xã hội và quản trị tốt.",
  },
  {
    id: "laozi",
    name: "Lão Tử (Laozi)",
    era: "6 thế kỷ TCN",
    school: "Đạo giáo",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Lao_Tzu_-_Project_Gutenberg_eText_15250.jpg/250px-Lao_Tzu_-_Project_Gutenberg_eText_15250.jpg",
    avatar:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Lao_Tzu_-_Project_Gutenberg_eText_15250.jpg/250px-Lao_Tzu_-_Project_Gutenberg_eText_15250.jpg",
    description:
      "Triết gia Trung Hoa cổ đại, tác giả của Đạo Đức Kinh và người sáng lập Đạo giáo triết học. Tư tưởng của ông tập trung vào Đạo (Way), vô vi (non-action), và sự hài hòa với tự nhiên.",
    keyIdeas: [
      "Đạo (The Way)",
      "Vô vi (Non-action)",
      "Âm dương",
      "Trở về tự nhiên",
      "Nước như là ẩn dụ",
    ],
    famousQuote:
      "Đạo sinh nhất, nhất sinh nhị, nhị sinh tam, tam sinh vạn vật.",
    context:
      "Bạn đang trò chuyện với Lão Tử, người sáng lập Đạo giáo triết học. Lão Tử dạy về Đạo - nguyên lý vĩnh cửu chi phối vũ trụ, và vô vi - hành động không cưỡng ép, theo dòng chảy tự nhiên. Ông nhấn mạnh sự khiêm tốn, đơn giản, và hài hòa với tự nhiên.",
  },
  {
    id: "descartes",
    name: "René Descartes",
    era: "1596-1650",
    school: "Chủ nghĩa duy lý",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/7/73/Frans_Hals_-_Portret_van_Ren%C3%A9_Descartes.jpg",
    avatar:
      "https://upload.wikimedia.org/wikipedia/commons/7/73/Frans_Hals_-_Portret_van_Ren%C3%A9_Descartes.jpg",
    description:
      'Triết gia, nhà toán học và khoa học người Pháp, được coi là cha đẻ của triết học hiện đại. Ông nổi tiếng với phương pháp nghi ngờ và câu nói "Cogito, ergo sum" (Tôi nghĩ, vậy tôi tồn tại).',
    keyIdeas: [
      "Nghi ngờ có phương pháp",
      "Cogito ergo sum",
      "Chủ nghĩa nhị nguyên tâm-thân",
      "Lý tính bẩm sinh",
      "Hình học tọa độ",
    ],
    famousQuote: "Tôi nghĩ, vậy tôi tồn tại.",
    context:
      'Bạn đang trò chuyện với René Descartes, cha đẻ của triết học hiện đại. Descartes sử dụng phương pháp nghi ngờ có hệ thống để tìm ra chân lý không thể nghi ngờ, dẫn đến kết luận nổi tiếng "Cogito, ergo sum". Ông phát triển chủ nghĩa nhị nguyên tâm-thân và nhấn mạnh vai trò của lý tính trong tri thức.',
  },
  {
    id: "kant",
    name: "Immanuel Kant",
    era: "1724-1804",
    school: "Chủ nghĩa duy tâm phê phán",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Immanuel_Kant_%281724-1804%29_engraving.jpg/800px-Immanuel_Kant_%281724-1804%29_engraving.jpg",
    avatar:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Immanuel_Kant_%281724-1804%29_engraving.jpg/800px-Immanuel_Kant_%281724-1804%29_engraving.jpg",
    description:
      "Triết gia người Đức, một trong những nhà tư tưởng có ảnh hưởng nhất trong triết học phương Tây. Ông cố gắng tổng hợp chủ nghĩa duy lý và chủ nghĩa kinh nghiệm, phát triển triết học phê phán.",
    keyIdeas: [
      "Chủ nghĩa duy tâm tiên nghiệm",
      "Mệnh lệnh tuyệt đối",
      "Phê phán lý tính thuần túy",
      "Hiện tượng và vật tự thân",
      "Tự luật đạo đức",
    ],
    famousQuote:
      "Hãy hành động sao cho nguyên tắc của bạn có thể trở thành quy luật phổ quát.",
    context:
      "Bạn đang trò chuyện với Immanuel Kant, người sáng lập triết học phê phán. Kant cố gắng tổng hợp chủ nghĩa duy lý và kinh nghiệm, cho rằng tri thức bắt đầu từ kinh nghiệm nhưng không xuất phát hoàn toàn từ kinh nghiệm. Ông phát triển lý thuyết về mệnh lệnh tuyệt đối trong đạo đức học và phân biệt giữa hiện tượng và vật tự thân.",
  },
  {
    id: "nietzsche",
    name: "Friedrich Nietzsche",
    era: "1844-1900",
    school: "Chủ nghĩa hư vô",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/1/1b/Nietzsche187a.jpg",
    avatar:
      "https://upload.wikimedia.org/wikipedia/commons/1/1b/Nietzsche187a.jpg",
    description:
      'Triết gia người Đức, nhà phê bình văn hóa và nhà văn. Ông nổi tiếng với tuyên bố "Thượng đế đã chết", lý thuyết siêu nhân, và phê phán đạo đức truyền thống.',
    keyIdeas: [
      "Thượng đế đã chết",
      "Siêu nhân (Übermensch)",
      "Ý chí quyền lực",
      "Vĩnh hằng luân hồi",
      "Phê phán đạo đức bầy đàn",
    ],
    famousQuote: "Thượng đế đã chết, và chúng ta đã giết Ngài.",
    context:
      'Bạn đang trò chuyện với Friedrich Nietzsche, nhà phê bình triệt để về đạo đức và tôn giáo truyền thống. Nietzsche tuyên bố "Thượng đế đã chết" để chỉ sự sụp đổ của các giá trị tuyệt đối, và kêu gọi con người trở thành "siêu nhân" - tự tạo ra giá trị của riêng mình thông qua ý chí quyền lực.',
  },
  {
    id: "sartre",
    name: "Jean-Paul Sartre",
    era: "1905-1980",
    school: "Chủ nghĩa hiện sinh",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/e/e9/Jean_Paul_Sartre_1965.jpg",
    avatar:
      "https://upload.wikimedia.org/wikipedia/commons/e/e9/Jean_Paul_Sartre_1965.jpg",
    description:
      "Triết gia, nhà văn và nhà hoạt động chính trị người Pháp, một trong những người đại diện chủ yếu của chủ nghĩa hiện sinh. Ông nhấn mạnh tự do, trách nhiệm và sự lựa chọn của con người.",
    keyIdeas: [
      "Hiện hữu đi trước bản chất",
      "Tự do tuyệt đối",
      "Tự기 mình",
      "Trách nhiệm",
      "Tồn tại cho mình và tồn tại tự thân",
    ],
    famousQuote: "Con người bị kết án tự do.",
    context:
      'Bạn đang trò chuyện với Jean-Paul Sartre, người đại diện chủ yếu của chủ nghĩa hiện sinh vô thần. Sartre cho rằng "hiện hữu đi trước bản chất" - con người không có bản chất định trước mà tự tạo ra bản thân qua các lựa chọn tự do. Ông nhấn mạnh trách nhiệm tuyệt đối đi kèm với tự do này.',
  },
  {
    id: "hegel",
    name: "Georg Wilhelm Friedrich Hegel",
    era: "1770-1831",
    school: "Chủ nghĩa duy tâm tuyệt đối",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/0/08/Hegel_portrait_by_Schlesinger_1831.jpg",
    avatar:
      "https://upload.wikimedia.org/wikipedia/commons/0/08/Hegel_portrait_by_Schlesinger_1831.jpg",
    description:
      "Triết gia người Đức, người phát triển chủ nghĩa duy tâm tuyệt đối và phép biện chứng. Hệ thống triết học của ông đã ảnh hưởng sâu rộng đến Marx và nhiều trường phái tư tưởng khác.",
    keyIdeas: [
      "Phép biện chứng (thesis-antithesis-synthesis)",
      "Tinh thần tuyệt đối",
      "Hiện thực là hợp lý",
      "Chủ-nô biện chứng",
      "Lịch sử như tự nhận thức của Tinh thần",
    ],
    famousQuote: "Cái gì hợp lý thì hiện thực, cái gì hiện thực thì hợp lý.",
    context:
      "Bạn đang trò chuyện với Hegel, người phát triển chủ nghĩa duy tâm tuyệt đối và phép biện chứng. Hegel cho rằng lịch sử là quá trình tự nhận thức của Tinh thần tuyệt đối qua các giai đoạn mâu thuẫn và tổng hợp. Phép biện chứng của ông (thesis-antithesis-synthesis) đã ảnh hưởng sâu rộng đến triết học sau này, đặc biệt là Marx.",
  },
];

export const getPhilosopherById = (id: string): Philosopher | undefined => {
  return philosophers.find((p) => p.id === id);
};

export const getRandomPhilosopher = (): Philosopher => {
  return philosophers[Math.floor(Math.random() * philosophers.length)];
};
