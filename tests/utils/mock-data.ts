export const mockData = {
  card: {
    title: "Test Card Title",
    excerpt:
      "This is a test card excerpt that provides a brief description of the content.",
    feature_image: "https://picsum.photos/400/300",
    author_name: "Test Author",
    author_url: "https://example.com/author",
    author_profile_image: "https://picsum.photos/50/50",
    published_at: "Jan 15, 2024",
    reading_time: "5 min read",
    tag_name: "Testing",
    tag_url: "https://example.com/tag/testing",
  },

  carousel: {
    items: Array.from({ length: 6 }, (_, i) => ({
      title: `Carousel Item ${i + 1}`,
      content: `Content for carousel item ${i + 1}`,
    })),
  },

  accordion: {
    items: [
      {
        header: "First Item",
        content: "Content for the first accordion item.",
      },
      {
        header: "Second Item",
        content: "Content for the second accordion item.",
      },
      {
        header: "Third Item",
        content: "Content for the third accordion item.",
      },
    ],
  },

  tabs: {
    items: [
      { label: "Tab 1", content: "Content for the first tab panel." },
      { label: "Tab 2", content: "Content for the second tab panel." },
      { label: "Tab 3", content: "Content for the third tab panel." },
    ],
  },

  grille: {
    items: Array.from({ length: 8 }, (_, i) => ({
      title: `Grid Item ${i + 1}`,
      content: `Content for grid item ${i + 1}`,
    })),
  },
};
