const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

walk('/project/client/src', function(filePath) {
  if (filePath.endsWith('.tsx')) {
    const content = fs.readFileSync(filePath, 'utf8');
    const importMatch = content.match(/import\s+\{([^}]+)\}\s+from\s+['"]lucide-react['"]/);
    if (importMatch) {
      const importedIcons = importMatch[1].split(',').map(i => i.trim());
      const usedIcons = new Set();
      const regex = /<([A-Z][a-zA-Z0-9]*)\s/g;
      let match;
      while ((match = regex.exec(content)) !== null) {
        usedIcons.add(match[1]);
      }
      
      const missingIcons = [];
      usedIcons.forEach(icon => {
        // Check if it's a lucide icon (we assume standard ones, or just check if it's not imported and not defined in the file)
        if (!importedIcons.includes(icon) && !content.includes(`const ${icon}`) && !content.includes(`function ${icon}`) && !content.includes(`class ${icon}`) && !content.includes(`import ${icon}`) && icon !== 'Fragment' && icon !== 'Link' && icon !== 'Route' && icon !== 'Routes' && icon !== 'BrowserRouter' && icon !== 'Navigate' && icon !== 'Outlet' && icon !== 'ErrorBoundary' && icon !== 'App' && icon !== 'Toast' && icon !== 'DashboardLayout' && icon !== 'ResponsiveContainer' && icon !== 'BarChart' && icon !== 'Bar' && icon !== 'XAxis' && icon !== 'YAxis' && icon !== 'CartesianGrid' && icon !== 'Tooltip' && icon !== 'Legend' && icon !== 'LineChart' && icon !== 'Line' && icon !== 'PieChart' && icon !== 'Pie' && icon !== 'Cell' && icon !== 'AreaChart' && icon !== 'Area') {
          // It might be an icon
          missingIcons.push(icon);
        }
      });
      
      if (missingIcons.length > 0) {
        console.log(`File: ${filePath}`);
        console.log(`Missing imports: ${missingIcons.join(', ')}`);
      }
    }
  }
});
