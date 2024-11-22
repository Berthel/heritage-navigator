SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.6
-- Dumped by pg_dump version 15.7 (Ubuntu 15.7-1.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
--



--
-- Data for Name: cities; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."cities" ("id", "name_da", "name_en", "name_pt", "description_da", "description_en", "description_pt", "country", "region", "latitude", "longitude", "bounds_ne_lat", "bounds_ne_lng", "bounds_sw_lat", "bounds_sw_lng", "default_zoom", "primary_image", "status", "last_updated") VALUES
	('tavira', 'Tavira', 'Tavira', 'Tavira', 'En charmerende historisk by i Algarve, Portugal, kendt for sin rige kulturarv og arkitektur', 'A charming historical town in Algarve, Portugal, known for its rich cultural heritage and architecture', 'Uma encantadora cidade histórica no Algarve, Portugal, conhecida pelo seu rico património cultural e arquitectura', 'Portugal', 'Algarve', 37.1283, -7.6506, 37.1383, -7.6406, 37.1183, -7.6606, 15, 'tavira-aerial', 'active', '2024-11-20 17:53:22.363979+00');


--
-- Data for Name: periods; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."periods" ("id", "name_da", "name_en", "name_pt", "description_da", "description_en", "description_pt", "order_number", "color", "start_year", "end_year") VALUES
	('roman', 'Romersk', 'Roman', 'Romano', 'Den romerske periode i Tavira', 'The Roman period in Tavira', 'O período romano em Tavira', 1, '#FF9800', -27, 476),
	('islamic', 'Islamisk', 'Islamic', 'Islâmico', 'Den islamiske periode i Tavira', 'The Islamic period in Tavira', 'O período islâmico em Tavira', 2, '#4CAF50', 711, 1249),
	('medieval', 'Middelalder', 'Medieval', 'Medieval', 'Middelalderen i Tavira', 'The Medieval period in Tavira', 'O período medieval em Tavira', 3, '#9C27B0', 1249, 1500),
	('cm3lf9pax0000142uwrq3c397', 'Roman Era', 'Roman Era', 'Roman Era', 'The Roman period in Tavira was marked by significant urban development and the establishment of important trade routes.', 'The Roman period in Tavira was marked by significant urban development and the establishment of important trade routes.', 'The Roman period in Tavira was marked by significant urban development and the establishment of important trade routes.', 1, '#FF9999', -27, 476),
	('cm3lf9pf30002142u2tutawnw', 'Medieval', 'Medieval', 'Medieval', 'The medieval period saw Tavira grow into an important port city with significant military and commercial importance.', 'The medieval period saw Tavira grow into an important port city with significant military and commercial importance.', 'The medieval period saw Tavira grow into an important port city with significant military and commercial importance.', 2, '#9999FF', 500, 1500),
	('cm3lf9pdq0001142uf0az5wfs', 'Moorish Period', 'Moorish Period', 'Moorish Period', 'The Moorish period brought significant cultural and architectural developments to Tavira, including the construction of the castle and various religious buildings.', 'The Moorish period brought significant cultural and architectural developments to Tavira, including the construction of the castle and various religious buildings.', 'The Moorish period brought significant cultural and architectural developments to Tavira, including the construction of the castle and various religious buildings.', 3, '#99FF99', 711, 1249);


--
-- Data for Name: images; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."images" ("id", "url", "alt_da", "alt_en", "alt_pt", "caption_da", "caption_en", "caption_pt", "credit", "year", "period_id", "order_number", "thumbnail_url", "medium_url", "large_url", "width", "height", "contexts") VALUES
	('castle1', '/images/sites/castle.jpg', 'Tavira Slot set fra nord', 'Tavira Castle viewed from the north', 'Castelo de Tavira visto do norte', 'Tavira Slot blev bygget i det 13. århundrede', 'Tavira Castle was built in the 13th century', 'O Castelo de Tavira foi construído no século XIII', 'Tavira Municipality', 2023, 'medieval', 1, '/images/sites/castle.jpg', '/images/sites/castle.jpg', '/images/sites/castle.jpg', 120, 90, '{thumbnail,gallery,banner}'),
	('roman-bridge1', '/images/sites/bridge.jpg', 'Den romerske bro i Tavira', 'The Roman Bridge in Tavira', 'A Ponte Romana em Tavira', NULL, NULL, NULL, 'Tavira Municipality', 2023, 'roman', 2, '/images/sites/bridge.jpg', '/images/sites/bridge.jpg', '/images/sites/bridge.jpg', 120, 90, '{thumbnail,gallery,description}'),
	('islamic1', '/images/sites/islamic.jpg', 'Det islamiske kvarter i Tavira', 'The Islamic Quarter in Tavira', 'O Bairro Islâmico em Tavira', NULL, NULL, NULL, 'Tavira Municipality', 2023, 'islamic', 3, '/images/sites/islamic.jpg', '/images/sites/islamic.jpg', '/images/sites/islamic.jpg', 120, 90, '{thumbnail,gallery,description}'),
	('cm3lf9pgg0005142up0lfm9nl', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Ponte_Romana_de_Tavira_2016-10-16.jpg/1280px-Ponte_Romana_de_Tavira_2016-10-16.jpg', 'Roman Bridge of Tavira', 'Roman Bridge of Tavira', 'Roman Bridge of Tavira', 'Roman Bridge of Tavira', 'Roman Bridge of Tavira', 'Roman Bridge of Tavira', 'Wikimedia Commons', NULL, NULL, 1, NULL, NULL, NULL, 1920, 1080, '{gallery}'),
	('cm3lf9pty000a142uvkbzqjho', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Castelo_de_Tavira_2016-10-16-2.jpg/1280px-Castelo_de_Tavira_2016-10-16-2.jpg', 'Tavira Castle', 'Tavira Castle', 'Tavira Castle', 'Tavira Castle', 'Tavira Castle', 'Tavira Castle', 'Wikimedia Commons', NULL, NULL, 2, NULL, NULL, NULL, 1920, 1080, '{gallery}');


--
-- Data for Name: city_images; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: city_periods; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: tags; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."tags" ("id", "name_da", "name_en", "name_pt", "type") VALUES
	('castle', 'Slot', 'Castle', 'Castelo', 'building'),
	('museum', 'Museum', 'Museum', 'Museu', 'activity');


--
-- Data for Name: city_tags; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: heritage_sites; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."heritage_sites" ("id", "city_id", "name_da", "name_en", "name_pt", "description_da", "description_en", "description_pt", "accessibility_da", "accessibility_en", "accessibility_pt", "thumbnail_image", "latitude", "longitude", "address", "primary_period", "status", "last_updated") VALUES
	('tavira-castle', 'tavira', 'Tavira Slot', 'Tavira Castle', 'Castelo de Tavira', 'Middelalderslot med fantastisk udsigt over byen', 'Medieval castle with stunning views over the city', 'Castelo medieval com vistas deslumbrantes sobre a cidade', NULL, NULL, NULL, 'castle1', 37.125486311869814, -7.6512044168311535, NULL, 'medieval', 'active', '2024-11-20 17:53:22.942706+00'),
	('roman-bridge', 'tavira', 'Romersk Bro', 'Roman Bridge', 'Ponte Romana', 'Antik romersk bro over floden Gilão', 'Ancient Roman bridge over the Gilão River', 'Antiga ponte romana sobre o Rio Gilão', NULL, NULL, NULL, 'roman-bridge1', 37.12700770825847, -7.649938518678061, NULL, 'roman', 'active', '2024-11-20 17:57:46.725923+00'),
	('islamic-museum', 'tavira', 'Islamisk Museum', 'Islamic Museum', 'Museu Islâmico', 'Museum med en rig samling af islamisk kunst og artefakter', 'Museum with a rich collection of Islamic art and artifacts', 'Museu com uma rica coleção de arte e artefatos islâmicos', NULL, NULL, NULL, 'islamic1', 37.12602951058043, -7.650243716831138, NULL, 'islamic', 'active', '2024-11-20 17:57:48.306489+00'),
	('cm3lf9pgg0004142uccn56osq', 'tavira', 'Roman Bridge', 'Roman Bridge', 'Roman Bridge', 'The iconic 7-arch bridge from Roman times, serving as one of Tavira''s most important crossing points for over two millennia.', 'The iconic 7-arch bridge from Roman times, serving as one of Tavira''s most important crossing points for over two millennia.', 'The iconic 7-arch bridge from Roman times, serving as one of Tavira''s most important crossing points for over two millennia.', NULL, NULL, NULL, 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Ponte_Romana_de_Tavira_2016-10-16.jpg/1280px-Ponte_Romana_de_Tavira_2016-10-16.jpg', 37.12702481644754, -7.64991706097908, 'Ponte Romana, Tavira, Portugal', 'cm3lf9pax0000142uwrq3c397', 'active', '2024-11-21 12:41:26.598837+00'),
	('cm3lf9pty0009142u1htt42fb', 'tavira', 'Tavira Castle', 'Tavira Castle', 'Tavira Castle', 'Moorish castle with panoramic views of the city, featuring well-preserved walls and towers from the 8th century.', 'Moorish castle with panoramic views of the city, featuring well-preserved walls and towers from the 8th century.', 'Moorish castle with panoramic views of the city, featuring well-preserved walls and towers from the 8th century.', NULL, NULL, NULL, 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Castelo_de_Tavira_2016-10-16-2.jpg/1280px-Castelo_de_Tavira_2016-10-16-2.jpg', 37.12550342040281, -7.651247332142672, 'Castelo de Tavira, Tavira, Portugal', 'cm3lf9pdq0001142uf0az5wfs', 'active', '2024-11-21 12:41:26.598837+00');


--
-- Data for Name: detail_sections; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."detail_sections" ("id", "site_id", "type", "content_da", "content_en", "content_pt", "image_layout", "order_number", "gallery_images") VALUES
	('tavira-castle-main', 'tavira-castle', 'text', 'Tavira Slot er en imponerende middelalderborg, der troner majestætisk over byen Tavira. Slottet blev oprindeligt bygget af maurerne i det 8. århundrede og senere genopbygget af portugiserne efter generobringstiden. Det fungerede som et vigtigt militært forsvarsværk og var afgørende for beskyttelsen af byen og dens havn.

Slottets arkitektur bærer præg af forskellige historiske perioder, fra de oprindelige mauriske fundamenter til de gotiske og renæssancetilføjelser. De massive mure og tårne vidner om dets militære betydning, mens de velbevarede detaljer afslører den kunstneriske finesse i middelalderens bygningskunst.

Fra slottets mure og tårne har besøgende en enestående udsigt over Taviras historiske centrum, med dens karakteristiske romerske tagkonstruktioner, kirkespir og den bugtende Gilão-flod. Dette panoramiske vue giver en perfekt forståelse af byens strategiske betydning gennem historien.

I dag er slottet et populært turistmål og et symbol på Taviras rige kulturarv. De velbevarede mure og tårne giver besøgende mulighed for at udforske middelalderens militære arkitektur, mens de smukke haver inden for murene tilbyder et fredeligt åndehul med historisk atmosfære.', 'Tavira Castle is an impressive medieval fortress that majestically overlooks the city of Tavira. Originally built by the Moors in the 8th century and later rebuilt by the Portuguese after the Reconquista, the castle served as a crucial military fortification, vital for protecting the city and its harbor.

The castle''s architecture bears witness to different historical periods, from its original Moorish foundations to Gothic and Renaissance additions. The massive walls and towers testify to its military significance, while the well-preserved details reveal the artistic sophistication of medieval architecture.

From the castle walls and towers, visitors enjoy an outstanding view of Tavira''s historic center, with its characteristic Roman-style roofs, church spires, and the winding Gilão River. This panoramic vista provides a perfect understanding of the city''s strategic importance throughout history.

Today, the castle is a popular tourist destination and a symbol of Tavira''s rich cultural heritage. The well-preserved walls and towers allow visitors to explore medieval military architecture, while the beautiful gardens within the walls offer a peaceful haven with a historical atmosphere.', 'O Castelo de Tavira é uma impressionante fortaleza medieval que domina majestosamente a cidade de Tavira. Originalmente construído pelos mouros no século VIII e posteriormente reconstruído pelos portugueses após a Reconquista, o castelo serviu como uma fortificação militar crucial, vital para a proteção da cidade e seu porto.

A arquitetura do castelo testemunha diferentes períodos históricos, desde suas fundações mouriscas originais até adições góticas e renascentistas. As paredes e torres maciças testemunham sua importância militar, enquanto os detalhes bem preservados revelam a sofisticação artística da arquitetura medieval.

Das muralhas e torres do castelo, os visitantes desfrutam de uma vista excepcional do centro histórico de Tavira, com seus característicos telhados de estilo romano, torres de igrejas e o serpenteante Rio Gilão. Esta vista panorâmica proporciona uma compreensão perfeita da importância estratégica da cidade ao longo da história.

Hoje, o castelo é um destino turístico popular e um símbolo do rico patrimônio cultural de Tavira. As muralhas e torres bem preservadas permitem aos visitantes explorar a arquitetura militar medieval, enquanto os belos jardins dentro das muralhas oferecem um refúgio pacífico com atmosfera histórica.', NULL, 1, NULL),
	('roman-bridge-main', 'roman-bridge', 'text', 'Den Romerske Bro i Tavira er et bemærkelsesværdigt eksempel på antik broarkitektur, der har tjent byen i århundreder. Selvom broen ofte kaldes "romersk", stammer den nuværende konstruktion faktisk fra den mauriske periode, med senere middelalderlige og moderne restaureringer.

Broen strækker sig elegant over Gilão-floden med syv buer, der hviler på solide stenpiller. Den karakteristiske buede form og stenarbejdet afspejler den traditionelle romerske og mauriske byggeteknik, der var almindelig i regionen. Broens robuste konstruktion har modstået århundreders brug og naturens kræfter.

I dag er broen et centralt element i Taviras bybillede og forbinder de to dele af den historiske bykerne. Den er ikke kun en vigtig transportvej, men også et populært mødested for både lokale og turister. Om aftenen, når broen er smukt oplyst, skaber den en særlig stemningsfuld atmosfære langs flodbredden.', 'The Roman Bridge in Tavira is a remarkable example of ancient bridge architecture that has served the city for centuries. Although often called "Roman," the current structure actually dates from the Moorish period, with later medieval and modern restorations.

The bridge elegantly spans the Gilão River with seven arches resting on solid stone pillars. The characteristic arched form and stonework reflect the traditional Roman and Moorish building techniques common in the region. The bridge''s robust construction has withstood centuries of use and natural forces.

Today, the bridge is a central element in Tavira''s cityscape, connecting the two parts of the historic city center. It serves not only as an important transportation route but also as a popular meeting place for both locals and tourists. In the evening, when the bridge is beautifully illuminated, it creates a particularly atmospheric ambiance along the riverbank.', 'A Ponte Romana em Tavira é um exemplo notável da arquitetura antiga de pontes que tem servido a cidade por séculos. Embora frequentemente chamada de "romana", a estrutura atual data do período mourisco, com restaurações medievais e modernas posteriores.

A ponte atravessa elegantemente o Rio Gilão com sete arcos apoiados em sólidos pilares de pedra. A forma arqueada característica e o trabalho em pedra refletem as técnicas tradicionais de construção romana e mourisca comuns na região. A construção robusta da ponte resistiu a séculos de uso e forças naturais.

Hoje, a ponte é um elemento central na paisagem urbana de Tavira, conectando as duas partes do centro histórico da cidade. Serve não apenas como uma importante rota de transporte, mas também como um local de encontro popular tanto para moradores quanto para turistas. À noite, quando a ponte está lindamente iluminada, ela cria um ambiente particularmente atmosférico ao longo da margem do rio.', NULL, 1, NULL),
	('islamic-museum-main', 'islamic-museum', 'text', 'Det Islamiske Museum i Tavira er en fascinerende kulturinstitution, der kaster lys over regionens rige mauriske arv. Museet er indrettet i en historisk bygning og huser en omfattende samling af islamiske artefakter, kunstværker og arkæologiske fund fra den periode, hvor Tavira var under maurisk herredømme.

Samlingen omfatter en imponerende række genstande, fra fint dekoreret keramik og metalarbejde til arkitektoniske elementer og kalligrafiske værker. Særligt bemærkelsesværdige er de velbevarede eksempler på islamisk geometrisk kunst og de detaljerede arabeskemønstre, der var karakteristiske for periodens kunstneriske udtryk.

Museet tilbyder også indsigt i det daglige liv i det mauriske Tavira gennem udstillinger af hverdagsgenstande, værktøj og personlige ejendele. Interaktive displays og informative plancher hjælper besøgende med at forstå den betydelige indflydelse, som den islamiske kultur har haft på regionens udvikling.

En særlig afdeling er dedikeret til islamisk videnskab og innovation, hvor besøgende kan lære om de mange videnskabelige og teknologiske fremskridt, der blev gjort under den islamiske guldalder. Dette omfatter udviklingen inden for matematik, astronomi, medicin og arkitektur.', 'The Islamic Museum in Tavira is a fascinating cultural institution that sheds light on the region''s rich Moorish heritage. Housed in a historic building, the museum contains an extensive collection of Islamic artifacts, artworks, and archaeological findings from the period when Tavira was under Moorish rule.

The collection includes an impressive array of objects, from finely decorated ceramics and metalwork to architectural elements and calligraphic works. Particularly noteworthy are the well-preserved examples of Islamic geometric art and the detailed arabesque patterns that were characteristic of the period''s artistic expression.

The museum also offers insights into daily life in Moorish Tavira through exhibitions of everyday objects, tools, and personal belongings. Interactive displays and informative panels help visitors understand the significant influence that Islamic culture has had on the region''s development.

A special section is dedicated to Islamic science and innovation, where visitors can learn about the many scientific and technological advances made during the Islamic Golden Age. This includes developments in mathematics, astronomy, medicine, and architecture.', 'O Museu Islâmico em Tavira é uma instituição cultural fascinante que lança luz sobre o rico patrimônio mourisco da região. Instalado em um edifício histórico, o museu contém uma extensa coleção de artefatos islâmicos, obras de arte e achados arqueológicos do período em que Tavira estava sob domínio mourisco.

A coleção inclui uma impressionante variedade de objetos, desde cerâmicas e trabalhos em metal finamente decorados até elementos arquitetônicos e obras caligráficas. Particularmente notáveis são os exemplos bem preservados de arte geométrica islâmica e os detalhados padrões arabescos que eram característicos da expressão artística do período.

O museu também oferece insights sobre a vida cotidiana na Tavira mourisca através de exposições de objetos do dia a dia, ferramentas e pertences pessoais. Displays interativos e painéis informativos ajudam os visitantes a entender a significativa influência que a cultura islâmica teve no desenvolvimento da região.

Uma seção especial é dedicada à ciência e inovação islâmica, onde os visitantes podem aprender sobre os muitos avanços científicos e tecnológicos feitos durante a Idade de Ouro Islâmica. Isso inclui desenvolvimentos em matemática, astronomia, medicina e arquitetura.', NULL, 1, NULL);


--
-- Data for Name: opening_hours; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."opening_hours" ("id", "site_id", "type", "valid_from", "valid_to", "metadata") VALUES
	('tavira-castle-regular', 'tavira-castle', 'regular', NULL, NULL, '{}'),
	('tavira-castle-seasonal', 'tavira-castle', 'seasonal', '2023-06-01', '2023-09-30', '{}'),
	('roman-bridge-regular', 'roman-bridge', 'regular', NULL, NULL, '{}'),
	('roman-bridge-seasonal', 'roman-bridge', 'seasonal', '2023-06-01', '2023-09-30', '{}'),
	('islamic-museum-regular', 'islamic-museum', 'regular', NULL, NULL, '{}'),
	('islamic-museum-seasonal', 'islamic-museum', 'seasonal', '2023-06-01', '2023-09-30', '{}');


--
-- Data for Name: site_images; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."site_images" ("site_id", "image_id") VALUES
	('tavira-castle', 'castle1'),
	('roman-bridge', 'roman-bridge1'),
	('islamic-museum', 'islamic1'),
	('cm3lf9pgg0004142uccn56osq', 'cm3lf9pgg0005142up0lfm9nl'),
	('cm3lf9pty0009142u1htt42fb', 'cm3lf9pty000a142uvkbzqjho');


--
-- Data for Name: site_periods; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."site_periods" ("site_id", "period_id") VALUES
	('tavira-castle', 'medieval'),
	('roman-bridge', 'roman'),
	('islamic-museum', 'islamic');


--
-- Data for Name: site_tags; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."site_tags" ("site_id", "tag_id") VALUES
	('tavira-castle', 'castle'),
	('islamic-museum', 'museum');


--
-- Data for Name: spatial_ref_sys; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--



--
-- Data for Name: time_slots; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."time_slots" ("id", "opening_hours_id", "day_of_week", "opens", "closes") VALUES
	('tavira-castle-regular-1', 'tavira-castle-regular', 1, '09:00:00', '17:00:00'),
	('tavira-castle-regular-2', 'tavira-castle-regular', 2, '09:00:00', '17:00:00'),
	('tavira-castle-regular-3', 'tavira-castle-regular', 3, '09:00:00', '17:00:00'),
	('tavira-castle-regular-4', 'tavira-castle-regular', 4, '09:00:00', '17:00:00'),
	('tavira-castle-regular-5', 'tavira-castle-regular', 5, '09:00:00', '17:00:00'),
	('tavira-castle-seasonal-1', 'tavira-castle-seasonal', 1, '09:00:00', '20:00:00'),
	('tavira-castle-seasonal-2', 'tavira-castle-seasonal', 2, '09:00:00', '20:00:00'),
	('tavira-castle-seasonal-3', 'tavira-castle-seasonal', 3, '09:00:00', '20:00:00'),
	('tavira-castle-seasonal-4', 'tavira-castle-seasonal', 4, '09:00:00', '20:00:00'),
	('tavira-castle-seasonal-5', 'tavira-castle-seasonal', 5, '09:00:00', '20:00:00'),
	('tavira-castle-seasonal-6', 'tavira-castle-seasonal', 6, '10:00:00', '18:00:00'),
	('tavira-castle-seasonal-0', 'tavira-castle-seasonal', 0, '10:00:00', '18:00:00'),
	('roman-bridge-regular-1', 'roman-bridge-regular', 1, '09:00:00', '17:00:00'),
	('roman-bridge-regular-2', 'roman-bridge-regular', 2, '09:00:00', '17:00:00'),
	('roman-bridge-regular-3', 'roman-bridge-regular', 3, '09:00:00', '17:00:00'),
	('roman-bridge-regular-4', 'roman-bridge-regular', 4, '09:00:00', '17:00:00'),
	('roman-bridge-regular-5', 'roman-bridge-regular', 5, '09:00:00', '17:00:00'),
	('roman-bridge-seasonal-1', 'roman-bridge-seasonal', 1, '09:00:00', '20:00:00'),
	('roman-bridge-seasonal-2', 'roman-bridge-seasonal', 2, '09:00:00', '20:00:00'),
	('roman-bridge-seasonal-3', 'roman-bridge-seasonal', 3, '09:00:00', '20:00:00'),
	('roman-bridge-seasonal-4', 'roman-bridge-seasonal', 4, '09:00:00', '20:00:00'),
	('roman-bridge-seasonal-5', 'roman-bridge-seasonal', 5, '09:00:00', '20:00:00'),
	('roman-bridge-seasonal-6', 'roman-bridge-seasonal', 6, '10:00:00', '18:00:00'),
	('roman-bridge-seasonal-0', 'roman-bridge-seasonal', 0, '10:00:00', '18:00:00'),
	('islamic-museum-regular-1', 'islamic-museum-regular', 1, '09:00:00', '17:00:00'),
	('islamic-museum-regular-2', 'islamic-museum-regular', 2, '09:00:00', '17:00:00'),
	('islamic-museum-regular-3', 'islamic-museum-regular', 3, '09:00:00', '17:00:00'),
	('islamic-museum-regular-4', 'islamic-museum-regular', 4, '09:00:00', '17:00:00'),
	('islamic-museum-regular-5', 'islamic-museum-regular', 5, '09:00:00', '17:00:00'),
	('islamic-museum-seasonal-1', 'islamic-museum-seasonal', 1, '09:00:00', '20:00:00'),
	('islamic-museum-seasonal-2', 'islamic-museum-seasonal', 2, '09:00:00', '20:00:00'),
	('islamic-museum-seasonal-3', 'islamic-museum-seasonal', 3, '09:00:00', '20:00:00'),
	('islamic-museum-seasonal-4', 'islamic-museum-seasonal', 4, '09:00:00', '20:00:00'),
	('islamic-museum-seasonal-5', 'islamic-museum-seasonal', 5, '09:00:00', '20:00:00'),
	('islamic-museum-seasonal-6', 'islamic-museum-seasonal', 6, '10:00:00', '18:00:00'),
	('islamic-museum-seasonal-0', 'islamic-museum-seasonal', 0, '10:00:00', '18:00:00');


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 1, false);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('"pgsodium"."key_key_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

RESET ALL;
