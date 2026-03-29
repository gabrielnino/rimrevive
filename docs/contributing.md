# Contributing Guidelines

## Welcome Contributors!

Thank you for considering contributing to RimRevive Vancouver! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone. We expect all contributors to:

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Accept constructive criticism gracefully
- Focus on what is best for the project and community

## How Can I Contribute?

### Reporting Bugs
- Check existing issues to avoid duplicates
- Use the bug report template
- Include steps to reproduce, expected vs actual behavior
- Add screenshots if applicable

### Suggesting Enhancements
- Use the feature request template
- Explain the problem and proposed solution
- Include mockups or examples if possible

### Code Contributions
- Fork the repository
- Create a feature branch
- Follow coding standards
- Add tests if applicable
- Submit a pull request

### Documentation
- Fix typos and grammatical errors
- Improve clarity and examples
- Add missing documentation
- Translate to other languages

### Testing
- Test existing features
- Report edge cases
- Improve test coverage
- Performance testing

## Development Setup

### Prerequisites
- Node.js 18.x or higher
- npm 10.x or higher
- Git
- Docker (optional, for containerized development)

### Local Development
1. **Fork and clone** the repository:
   ```bash
   git clone https://github.com/your-username/rimrevive.git
   cd rimrevive
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

5. **Open browser**: `http://localhost:3000`

### Docker Development
```bash
# Build development image
docker build -t rimrevive-dev .

# Run with hot reload
docker run -p 3000:3000 \
  -v $(pwd):/app \
  -v /app/node_modules \
  --env-file .env.local \
  rimrevive-dev npm run dev
```

## Project Structure

```
rimrevive/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Home page
│   ├── globals.css       # Global styles
│   ├── api/              # API routes
│   └── [pages]/          # Additional pages
├── components/           # React components
├── lib/                 # Utility functions
├── public/              # Static assets
├── scripts/             # Deployment scripts
├── docs/                # Documentation
└── tests/               # Test files (future)
```

## Coding Standards

### TypeScript Guidelines
- Use TypeScript strict mode
- Define interfaces for props and state
- Avoid `any` type; use `unknown` or specific types
- Use ESLint and Prettier for consistency

### React/Next.js Conventions
- Use functional components with hooks
- Follow Next.js 14 App Router patterns
- Use server components where possible
- Implement proper error boundaries

### Styling
- Use Tailwind CSS for utility classes
- CSS-in-JS for dynamic styles
- Follow design system variables
- Mobile-first responsive design

### File Naming
- PascalCase for components: `ComponentName.tsx`
- camelCase for utilities: `utilityFunction.ts`
- kebab-case for pages: `page-name/`
- Descriptive, meaningful names

### Commit Messages
Follow Conventional Commits:
```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Example**:
```
feat(quote): add photo upload to quote form

- Implement drag-and-drop file upload
- Add file validation (max 4 files)
- Update API to handle photo count

Closes #123
```

## Testing

### Running Tests
```bash
# Run all tests
npm test

# Run specific test file
npm test -- ComponentName.test.tsx

# Run with coverage
npm test -- --coverage
```

### Test Structure
- **Unit tests**: Test individual functions and components
- **Integration tests**: Test API routes and component interactions
- **End-to-end tests**: Test complete user flows (future)

### Test Guidelines
- Write tests for new features
- Maintain test coverage above 80%
- Use mocking for external dependencies
- Test edge cases and error conditions

## Pull Request Process

### Before Submitting
1. Ensure your code follows project standards
2. Run tests and ensure they pass
3. Update documentation if needed
4. Rebase on latest main branch

### Creating a Pull Request
1. Use descriptive title and description
2. Link related issues
3. Add screenshots for UI changes
4. Request review from maintainers

### PR Review Process
1. **Automated checks**: CI pipeline runs tests and builds
2. **Code review**: At least one maintainer must approve
3. **Feedback**: Address review comments promptly
4. **Merge**: Squash and merge with descriptive commit message

### PR Templates
Use the provided PR templates for:
- Bug fixes
- Feature requests
- Documentation updates
- Dependency updates

## Documentation

### Writing Documentation
- Use clear, concise language
- Include code examples
- Add screenshots for UI components
- Keep documentation up to date

### Documentation Structure
- **README.md**: Project overview and quick start
- **docs/**: Detailed documentation
- **Code comments**: Explain complex logic
- **TypeScript types**: Self-documenting where possible

## Design System

### Colors
- Use CSS variables from `globals.css`
- Follow dark theme with lime accents
- Maintain contrast ratio for accessibility

### Typography
- Three font families: display, body, mono
- Consistent sizing and spacing
- Responsive typography with `clamp()`

### Components
- Reusable, composable components
- Consistent prop interfaces
- Accessibility support (ARIA labels, keyboard nav)

## Performance Guidelines

### Bundle Size
- Lazy load components where possible
- Optimize images with Next.js Image
- Tree-shake unused imports
- Monitor bundle size with `@next/bundle-analyzer`

### Rendering Performance
- Use React.memo for expensive components
- Implement virtualization for long lists
- Optimize re-renders with useMemo/useCallback
- Server-side render where appropriate

### API Performance
- Implement caching headers
- Rate limiting for API endpoints
- Database query optimization
- Connection pooling (future)

## Security Considerations

### Code Security
- Validate all user input
- Use parameterized queries (when using SQL)
- Implement CSRF protection
- Sanitize HTML output

### Dependency Security
- Regular dependency updates
- Use `npm audit` to check vulnerabilities
- Pin dependency versions in production

### Environment Security
- Never commit secrets to repository
- Use environment variables for configuration
- Implement proper file permissions
- Regular security audits

## Internationalization

### Current Status
- English only (primary language)
- Spanish market analysis content
- Basic WhatsApp messages in Spanish

### Adding Languages
1. Create translation files in `locales/`
2. Implement Next.js i18n routing
3. Update components to use translation hooks
4. Add language selector UI

## Accessibility (A11y)

### Guidelines
- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Screen reader compatibility
- Color contrast compliance

### Testing Accessibility
- Use axe DevTools extension
- Manual keyboard navigation testing
- Screen reader testing (NVDA, VoiceOver)
- Color contrast checkers

## Deployment Considerations

### Before Deployment
- Run full test suite
- Check bundle size
- Verify environment variables
- Update deployment documentation

### Deployment Types
- **Development**: Local or Docker
- **Staging**: Preview deployments
- **Production**: Docker + Nginx

### Rollback Plan
- Maintain database backups
- Keep previous Docker images
- Monitor application metrics
- Have rollback script ready

## Communication

### Issue Tracking
- Use GitHub Issues for bugs and features
- Label issues appropriately (bug, enhancement, documentation)
- Assign issues to contributors
- Update issue status regularly

### Discussions
- GitHub Discussions for ideas and questions
- Regular community meetings (if applicable)
- Documentation for common questions

### Getting Help
- Check documentation first
- Search existing issues
- Ask in GitHub Discussions
- Contact maintainers for urgent issues

## Recognition

### Contributor Hall of Fame
- Listed in CONTRIBUTORS.md
- GitHub contributor graph
- Special thanks in release notes

### First-time Contributors
- Look for "good first issue" labels
- Ask questions - we're here to help!
- Small contributions welcome

## Financial Contributions

### Sponsorship
- Infrastructure costs (hosting, domains)
- Development tools and services
- Contributor stipends (future goal)

### Transparency
- Public roadmap and priorities
- Budget and spending reports
- Open decision-making process

## Project Governance

### Maintainers
- Review and merge pull requests
- Manage releases and deployments
- Set project direction and priorities
- Ensure code quality and standards

### Decision Making
- Major changes require consensus
- RFC (Request for Comments) process for significant changes
- Community feedback considered

### Release Process
1. Feature freeze and testing
2. Version bump (semantic versioning)
3. Release notes and documentation
4. Deployment and monitoring

## Roadmap

### Short-term (Next 3 months)
- Admin dashboard for lead management
- Email notifications in addition to WhatsApp
- Improved photo upload with cloud storage
- Basic analytics and reporting

### Medium-term (3-6 months)
- Multi-language support
- Mobile app for technicians
- Integration with scheduling systems
- Advanced analytics dashboard

### Long-term (6+ months)
- Franchise model support
- AI-powered damage assessment
- Marketplace for rim parts
- International expansion

## Getting Started as a Contributor

### First Contribution
1. Set up development environment
2. Pick an issue labeled "good first issue"
3. Discuss approach in issue comments
4. Submit pull request with changes
5. Address review feedback

### Mentorship
- Ask for mentor if needed
- Pair programming sessions available
- Code review with detailed feedback
- Learning resources provided

### Building Trust
- Start with small, focused contributions
- Communicate clearly and regularly
- Follow project standards and processes
- Be responsive to feedback

## Thank You!

Your contributions help make RimRevive better for everyone. Whether you're fixing bugs, adding features, improving documentation, or just sharing ideas, we appreciate your help in building a great product for the rim repair community.

---

*Last Updated: March 29, 2026*