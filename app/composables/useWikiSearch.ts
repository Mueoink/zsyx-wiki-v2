// app/composables/useWikiSearch.ts
import MiniSearch from "minisearch";
import { ref } from "vue"; 

export const useWikiSearch = () => {
  const searchResult = ref<any[]>([]);

  const isLoaded = ref(false);
  let miniSearch: MiniSearch | null = null;

  const initSearch = async () => {
    if (isLoaded.value) return;

    miniSearch = new MiniSearch({
      fields: ["title", "description", "tags", "authors", "category"],
      storeFields: [
        "title",
        "path",
        "description",
        "navType",
        "category",
        "tags",
        "authors",
      ],
      searchOptions: {
        boost: { title: 3, tags: 2, authors: 2, description: 1 },
        prefix: true,
        fuzzy: 0.2,
      },
    });

    const data = await queryCollection("content")
      .select(
        "title",
        "path",
        "description",
        "navType",
        "category",
        "tags",
        "authors",
      )
      .all();

    const indexedData = data.map((doc) => ({
      id: doc.path,
      ...doc,
      tags: Array.isArray(doc.tags) ? doc.tags.join(" ") : "",
      authors: Array.isArray(doc.authors) ? doc.authors.join(" ") : "",
    }));

    miniSearch.addAll(indexedData);
    isLoaded.value = true;
  };
  const search = (query: string) => {
    if (!miniSearch || !query || !query.trim()) {
      searchResult.value = [];
      return;
    }

    searchResult.value = miniSearch.search(query).slice(0, 10);
  };

  return {
    initSearch,
    search,
    searchResult,
    isLoaded,
  };
};
