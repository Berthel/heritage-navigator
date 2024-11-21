# Først rydder vi op og kopierer de vigtige filer
rm -rf review-filer
mkdir review-filer

# Kopierer filer fra src mappen og roden
cp heritage-navigator/src/app/layout.tsx heritage-navigator/src/app/page.tsx heritage-navigator/src/app/globals.css \
   heritage-navigator/src/components/Map.tsx heritage-navigator/src/components/AppHeader.tsx \
   heritage-navigator/src/components/SiteList.tsx heritage-navigator/src/components/SiteDetails.tsx \
   heritage-navigator/src/components/SiteCard.tsx \
   heritage-navigator/src/hooks/useGeolocation.ts heritage-navigator/src/hooks/useFavorites.ts \
   heritage-navigator/src/lib/distance.ts heritage-navigator/src/lib/supabase.ts \
   heritage-navigator/src/types/index.ts heritage-navigator/src/types/models.ts \
   heritage-navigator/tailwind.config.ts heritage-navigator/package.json \
   heritage-navigator/next.config.js heritage-navigator/tsconfig.json review-filer/

# Laver det samlede dokument
(
echo "# Kodegennemgang Heritage Navigator - Kernekomponenter" > samlet-kerne.md

cd review-filer
for file in *; do
    echo "" >> ../samlet-kerne.md
    echo "## $file" >> ../samlet-kerne.md
    echo "" >> ../samlet-kerne.md
    echo "\`\`\`" >> ../samlet-kerne.md
    cat "$file" >> ../samlet-kerne.md
    echo "\`\`\`" >> ../samlet-kerne.md
done
)